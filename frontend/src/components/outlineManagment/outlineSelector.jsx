import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/outlineSelector.css';

const OutlineSelector = ({ outlineID, courseID, term, status }) => {

    const navigate = useNavigate();

    const selectOutline = () => {
        navigate("/createOutline", { state: outlineID });
    }

    return (
        <ul id="outline" onClick={selectOutline}>
            <li id="courseID">{courseID}</li>
            <li id="term">{term}</li>
            <li id="status">Status: {status}</li>
        </ul>
    );
}

export default OutlineSelector;