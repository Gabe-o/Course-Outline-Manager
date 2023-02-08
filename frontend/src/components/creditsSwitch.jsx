import React, { useState } from "react";
import "../styles/creditsSwitch.css"

const CreditSwitch = () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleClick = (value) => {
        setSelectedValue(value);
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