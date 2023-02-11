import React, { useState } from 'react';
import moment from 'moment';
import "../styles/counter.css";

const Counter = ({ sectionLabel }) => {
    const [count, setCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [originalCount, setOriginalCount] = useState(0);

    const handleIncrement = () => {
        if (count < 3) {
            setEditing(true);
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 0) {
            setEditing(true);
            setCount(count - 1);
        }
    };

    const handleSave = () => {
        setEditing(false);
        setOriginalCount(count);
        console.log(sectionLabel + " " + moment().format("YYYY-MM-DD hh:mm:ss"));
    };

    const handleCancel = () => {
        setEditing(false);
        setCount(originalCount);
    };

    return (
        <div>
            <button className="counter-button" onClick={handleDecrement}>-</button>
            <span className="counter-value">{count}</span>
            <button className="counter-button" onClick={handleIncrement}>+</button>
            {editing && (
                <div>
                    <button className="save" onClick={handleSave}>Save</button>
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Counter;