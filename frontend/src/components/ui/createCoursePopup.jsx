import React, { useState } from 'react';
import "../../styles/coursePopup.css";

function CreateCoursePopup({ showCoursePopup, setShowCoursePopup }) {
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [reviewer, setReviewer] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setCourseId("");
        setCourseName("");
        setReviewer("");
        setShowCoursePopup(false);
    };

    return (
        <div>
            {showCoursePopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-button" onClick={() => setShowCoursePopup(false)}>
                            X
                        </button>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="courseId"
                                placeholder="Enter course ID"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                            />
                            <input
                                type="text"
                                id="courseName"
                                placeholder="Enter course name"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <select value={reviewer} onChange={(e) => setReviewer(e.target.value)}>
                                <option value="">Select a reviewer</option>
                                <option value="reviewer1">Reviewer 1</option>
                                <option value="reviewer2">Reviewer 2</option>
                                <option value="reviewer3">Reviewer 3</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateCoursePopup;