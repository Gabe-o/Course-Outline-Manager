import React, { useState } from 'react';
import axios from "axios";
import cookies from "js-cookie";
import moment from 'moment';
import LearningObjectivesDropdown from './learningObjectivesDropdown';

const LearningObjective = ({ objective, sectionLabel }) => {
    const [editing, setEditing] = useState(false);
    const [indicator, setIndicator] = useState("Select GA Indicator");
    const [comment, setComment] = useState("");
    const [savedIndicator, setSavedIndicator] = useState("Select GA Indicator");
    const [savedComment, setSavedComment] = useState("");

    const handleSave = () => {
        setEditing(false);
        setSavedIndicator(indicator);
        setSavedComment(comment);

        console.log(sectionLabel + " " + indicator + " " + comment + " " + moment().format("YYYY-MM-DD hh:mm:ss"));
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
            section: sectionLabel,
            content: indicator,
            comment: comment,
            outlineID: 0,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    }

    const handleCancel = () => {
        setEditing(false);
        setIndicator(savedIndicator);
        setComment(savedComment);
    }

    const handleEdit = () => {
        setEditing(true);
    }

    return (
        <>
            <h3>{objective}</h3>
            {
                editing ?
                    <>
                        <LearningObjectivesDropdown indicator={indicator} setIndicator={setIndicator} />
                    </>
                    :
                    <>
                        <p>{savedIndicator}</p>
                    </>
            }
            <h5>Comments</h5>
            {
                editing ?
                    <>
                        <input value={comment} onChange={(event) => setComment(event.target.value)} />
                        <button className="save" onClick={handleSave}>Save</button>
                        <button className="cancel" onClick={handleCancel}>Cancel</button>
                    </>
                    :
                    <>
                        <p>{savedComment}</p>
                        <button className="edit" onClick={handleEdit}>Edit</button>
                    </>
            }
        </>
    );
};

export default LearningObjective;