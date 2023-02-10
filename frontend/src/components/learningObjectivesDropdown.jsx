import React, { useState } from "react";

const LearningObjectiveDropdown = ({ indicator, setIndicator }) => {

    return (
        <select value={indicator} onChange={e => setIndicator(e.target.value)}>
            <option value="Select GA Indicator" disabled>Select GA Indicator</option>
            <option value="I">I</option>
            <option value="D">D</option>
            <option value="A">A</option>
            <option value="X">X</option>
        </select>
    );
};

export default LearningObjectiveDropdown;