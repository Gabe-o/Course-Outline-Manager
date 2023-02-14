import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import moment from "moment";

const EvaluationDescription = ({ evaluation, sectionLabel }) => {
    const [value, setValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState("");

    const handleEdit = () => {
        setTempValue(value);
        setIsEditing(true);
    };

    const handleSave = () => {
        setValue(tempValue);
        setIsEditing(false);

        console.log(sectionLabel + " " + tempValue + " " + moment().format("YYYY-MM-DD hh:mm:ss"));// update eval desc
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
            section: sectionLabel,
            content: tempValue,
            comment: null,
            outlineID: 0,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    return (
        <div>
            {!isEditing ? (
                <div>
                    <h3>{evaluation}</h3>
                    <p>{value}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            ) : (
                <div>
                    <textarea value={tempValue} onChange={(event) => setTempValue(event.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default EvaluationDescription;

