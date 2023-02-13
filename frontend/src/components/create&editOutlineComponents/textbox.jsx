import React, { useState } from "react";
import moment from "moment";
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