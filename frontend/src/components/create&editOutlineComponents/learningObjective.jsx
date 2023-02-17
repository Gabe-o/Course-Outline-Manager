import React, { useEffect, useState } from 'react';
import axios from "axios";
import cookies from "js-cookie";
import moment from 'moment';
import LearningObjectivesDropdown from './learningObjectivesDropdown';
import '../../styles/learningObjective.css';

const LearningObjective = ({ objective, sectionLabel, outlineID }) => {
    const [editing, setEditing] = useState(false);
    const [indicator, setIndicator] = useState("Select GA Indicator");
    const [comment, setComment] = useState("");
    const [savedIndicator, setSavedIndicator] = useState("Select GA Indicator");
    const [savedComment, setSavedComment] = useState("");
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setIndicator(res.data[0].content);
                setSavedIndicator(res.data[0].content);
                setComment(res.data[0].comment);
                setSavedComment(res.data[0].comment);
            })
            .catch(err => {

            })
    }, [savedIndicator, savedComment]);

    const handleSave = () => {
        setEditing(false);
        setSavedIndicator(indicator);
        setSavedComment(comment);

        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: indicator,
            comment: comment,
            outlineID: outlineID,
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
                        <br />
                        <button className="edit" onClick={handleEdit}>Edit</button>
                    </>
            }
            <p>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
        </>
    );
};

export default LearningObjective;