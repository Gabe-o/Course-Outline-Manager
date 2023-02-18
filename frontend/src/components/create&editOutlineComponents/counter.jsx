import React, { useState, useEffect } from 'react';
import axios from "axios";
import cookies from "js-cookie";
import moment from 'moment';
import "../../styles/counter.css";


const Counter = ({ sectionLabel, outlineID }) => {
    const [count, setCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [originalCount, setOriginalCount] = useState(0);
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setCount(parseInt(res.data[0].content));
                setOriginalCount(parseInt(res.data[0].content));
            })
            .catch(err => {

            })
    }, [editing]);

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
        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: count,
            comment: null,
            outlineID: outlineID,
        }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .then(res => {
                setEditing(false);
                setOriginalCount(count);
            })
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
            <p id='lastEdit'>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
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