import React, { useState } from "react";
import "../styles/creditsRadioButton.css";

const CreditsRadioButton = () => {
    const [selected, setSelected] = useState(0.5);

    const handleClick = (value) => {
        setSelected(value);
    };

    return (
        <div>
            <button onClick={() => handleClick(0.5)}>0.5</button>
            <button onClick={() => handleClick(1)}>1</button>
        </div>
    );
};

export default CreditsRadioButton;




