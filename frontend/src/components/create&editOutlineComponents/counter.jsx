import React, { useState } from 'react';
import axios from "axios";
import cookies from "js-cookie";
import moment from 'moment';
import "../../styles/counter.css";

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

        console.log(sectionLabel + " " + count + " " + moment().format("YYYY-MM-DD hh:mm:ss"));
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
            section: sectionLabel,
            content: count,
            comment: null,
            outlineID: 0,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });
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