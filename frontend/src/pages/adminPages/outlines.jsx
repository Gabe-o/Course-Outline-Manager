import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/outlines.css';

// A single document component
const Outlines = ({ courseID, term, status, outlineID }) => {

  const navigate = useNavigate();

  const selectOutline = () => {
    navigate("/createOutline", { state: outlineID });
  }

  return (
    <div className="document">
      <div className="document-info">
        <div className="document-name">{courseID}</div>
        <div className="document-creator">Term: {term}</div>
        <div className="document-last-modified">Status: {status}</div>
      </div>
      <div className="document-actions">
        <button className="edit-button" onClick={selectOutline}>Edit</button>
        {/*<button className="approve-button">Approve</button>
        <button className="delete-button">Delete</button>*/}
      </div>
    </div>
  );
};

export default Outlines;