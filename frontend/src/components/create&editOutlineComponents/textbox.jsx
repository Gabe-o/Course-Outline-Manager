import React, { useState } from "react";
import cookies from "js-cookie";
import moment from "moment";
import axios from "axios";
import "../../styles/textbox.css";

const Textbox = ({ defaultValue, sectionLabel }) => {
    const [value, setValue] = useState(defaultValue);
    const [editing, setEditing] = useState(false);
    const [originalValue, setOriginalValue] = useState(defaultValue);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        setOriginalValue(value);

        console.log(sectionLabel + " " + value + " " + moment().format("YYYY-MM-DD hh:mm:ss"));
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
            section: sectionLabel,
            content: value,
            comment: null,
            outlineID: 0,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
    };

    const handleCancel = () => {
        setEditing(false);
        setValue(originalValue);
    };

    return (
        <div>
            {!editing && <p>{value}</p>}
            {!editing && (
                <button className="edit" onClick={handleEdit}>Edit</button>
            )}
            {editing && (
                <div>
                    <input value={value} onChange={(event) => setValue(event.target.value)} />
                    <button className="save" onClick={handleSave}>Save</button>
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Textbox;