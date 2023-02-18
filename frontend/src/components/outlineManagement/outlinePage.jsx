import React from "react";
import "../../styles/outlines.css";
import Outlines from "../../pages/adminPages/outlines.jsx";

const Outlinepage = () => {
    const documents = [
        { name: "Document 1", creator: "John Doe", lastModified: "2022-12-31" },
        { name: "Document 2", creator: "Jane Smith", lastModified: "2022-11-30" },
        { name: "Document 3", creator: "Bob Johnson", lastModified: "2022-10-31" }
    ];

    return (
        <div className="page">
            <div className="document-list">
                {documents.map((document, index) => (
                    <Outlines key={index} name={document.name} creator={document.creator} lastModified={document.lastModified} />
                ))}
            </div>
        </div>
    );
};

export default Outlinepage;