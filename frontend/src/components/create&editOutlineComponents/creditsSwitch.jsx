import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import moment from "moment";
import "../../styles/creditsSwitch.css"

const CreditSwitch = ({ sectionLabel, outlineID }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [lastMod, setLastMod] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/api/modification?outlineID=" + outlineID + "&section=" + sectionLabel + "&newest=true", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                setLastMod(res.data[0]);
                setSelectedValue(parseFloat(res.data[0].content));
            })
            .catch(err => {

            })
    }, [selectedValue]);

    const handleClick = (value) => {
        setSelectedValue(value);

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

    return (
        <div>
            <button
                className={`value-button ${selectedValue === 0.5 ? "glow" : ""}`}
                onClick={() => handleClick(0.5)}
            >
                0.5
            </button>
            <button
                className={`value-button ${selectedValue === 1 ? "glow" : ""}`}
                onClick={() => handleClick(1)}
            >
                1
            </button>
            <p id='lastEdit'>Last Edited: {lastMod ? lastMod.authorID + " " + moment(lastMod.dateTime).format("YYYY-MM-DD HH:mm:ss") : ""}</p>
            {selectedValue && (
                <div className="selected-value">Selected value: {selectedValue}</div>
            )}
        </div>
    );
};

export default CreditSwitch;