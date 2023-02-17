import { useEffect, useState } from "react";

const outline = ({ courseID, term, status }) => {

    return (
        <ul>
            <li id="courseID">{courseID}</li>
            <li id="term">{term}</li>
            <li id="status">{status}</li>
        </ul>
    );
}

export default outline;