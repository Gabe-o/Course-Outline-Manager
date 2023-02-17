import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import moment from "moment";

const EvaluationDescription = ({ evaluation, sectionLabel, outlineID }) => {
    const [value, setValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState("");
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setValue(res.data[0].content);
            })
            .catch(err => {

            })

    }, [value]);

    const handleEdit = () => {
        setTempValue(value);
        setIsEditing(true);
    };

    const handleSave = () => {
        setValue(tempValue);
        setIsEditing(false);

        // update eval desc
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: tempValue,
            comment: null,
            outlineID: outlineID,
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
                    <p id='lastEdit'>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
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

