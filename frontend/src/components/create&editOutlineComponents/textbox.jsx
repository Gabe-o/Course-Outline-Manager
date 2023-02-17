import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import moment from "moment";
import axios from "axios";
import "../../styles/textbox.css";

const Textbox = ({ defaultValue, sectionLabel, outlineID }) => {
    const [value, setValue] = useState(defaultValue);
    const [editing, setEditing] = useState(false);
    const [originalValue, setOriginalValue] = useState(defaultValue);
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setValue(res.data[0].content);
                setOriginalValue(res.data[0].content);
            })
            .catch(err => {

            })
    }, [originalValue]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        setOriginalValue(value);

        axios.post("http://localhost:9000/api/modification", {
            dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            section: sectionLabel,
            content: value,
            comment: null,
            outlineID: outlineID,
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
            {!editing && <p>{value}</p>
            }
            {!editing && (
                <div id="editBtn">
                    <button className="edit" onClick={handleEdit}>Edit</button>
                    <p>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
                </div>
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