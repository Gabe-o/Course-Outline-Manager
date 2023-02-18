import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import "../../styles/coursePopup.css";

function CreateCoursePopup({ showCoursePopup, setShowCoursePopup }) {
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [department, setDepartment] = useState("");
    const [reviewers, setReviewers] = useState([]);
    const [reviewer, setReviewer] = useState("");

    useEffect(() => {
        axios.get("http://localhost:9000/api/user/reviewers")
            .then(res => {
                setReviewers(res.data);
            })
            .catch(err => {
                console.log("Error getting reviewers");
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:9000/api/course", { courseID: courseId, courseName: courseName, courseReviewer: reviewer, department: department }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
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
                        <button className="close-button" onClick={() => setShowCoursePopup(false)}>X</button>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter course ID" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
                            <input type="text" placeholder="Enter course name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                            <select value={department} onChange={(event) => setDepartment(event.target.value)}>
                                <option value="" disabled hidden>Select Department</option>
                                <option value="ECE">ECE</option>
                                <option value="SE">SE</option>
                                <option value="CE">CE</option>
                            </select>
                            <select value={reviewer} onChange={(event) => setReviewer(event.target.value)}>
                                <option value="" disabled hidden>Select Reviewer</option>
                                {reviewers.length > 0 ? reviewers.map(element =>
                                    <option value={element.userID}>{element.userID}</option>
                                ) : null}
                            </select>
                            <button type="submit">Add Course</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateCoursePopup;