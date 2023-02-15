import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import moment from "moment";
import "../../styles/creditsSwitch.css"

const CreditSwitch = ({ sectionLabel }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleClick = (value) => {
        setSelectedValue(value);

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
            {selectedValue && (
                <div className="selected-value">Selected value: {selectedValue}</div>
            )}
        </div>
    );
};

export default CreditSwitch;