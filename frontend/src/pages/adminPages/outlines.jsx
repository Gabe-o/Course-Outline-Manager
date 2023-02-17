import React from 'react';
import '../../styles/outlines.css';

// A single document component
const Outlines = ({ name, creator, lastModified }) => {
  return (
    <div className="document">
      <div className="document-info">
        <div className="document-name">{name}</div>
        <div className="document-creator">Created by: {creator}</div>
        <div className="document-last-modified">Last Modified: {lastModified}</div>
      </div>
      <div className="document-actions">
        <button className="edit-button">Edit</button>
        <button className="approve-button">Approve</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default Outlines;