import React, { useState } from "react";

const EvaluationDescription = ({ evaluation }) => {
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

