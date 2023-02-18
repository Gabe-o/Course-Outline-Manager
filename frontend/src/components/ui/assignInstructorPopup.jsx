import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import "../../styles/coursePopup.css";

function AssignInstructorPopup({ showAssignInstructorPopup, setShowAssignInstructorPopup }) {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [course, setCourse] = useState("");
    const [term, setTerm] = useState("");
    const [instructor, setInstructor] = useState("");

    useEffect(() => {
        axios.get("http://localhost:9000/api/user/instructors")
            .then(res => {
                setInstructors(res.data);
            })
            .catch(err => {
                console.log("Error getting instructor");
            });
        axios.get("http://localhost:9000/api/course")
            .then(res => {
                setCourses(res.data);
            })
            .catch(err => {
                console.log("Error getting course ID's");
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:9000/api/userCourse", { userID: instructor, courseID: course, term: term }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
            .then(res => {
                axios.post("http://localhost:9000/api/outline", { dateApproved: null, status: "pending", courseID: course, term: term }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
                    .catch(err => {
                        axios.delete("http://localhost:9000/api/userCourse", { userID: instructor, courseID: course, term: term }, { headers: { "Content-Type": "application/json", "token": cookies.get("jwt") } })
                            .catch(err => {
                                alert("Fatal error occured, contact administrator");
                            });
                    });
            })
            .catch(err => {
                console.log("Error assigning outline");
            });
        setCourse("");
        setTerm("");
        setInstructor("");
        setShowAssignInstructorPopup(false);
    };

    return (
        <div>
            {showAssignInstructorPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button className="close-button" onClick={() => setShowAssignInstructorPopup(false)}>X</button>
                        <form onSubmit={handleSubmit}>
                            <select value={course} onChange={(event) => setCourse(event.target.value)}>
                                <option value="" disabled hidden>Select Course ID</option>
                                {courses.length > 0 ? courses.map(element =>
                                    <option value={element.courseID}>{element.courseID}</option>
                                ) : null}
                            </select>
                            <select value={instructor} onChange={(event) => setInstructor(event.target.value)}>
                                <option value="" disabled hidden>Select Instructor</option>
                                {instructors.length > 0 ? instructors.map(element =>
                                    <option value={element.userID}>{element.userID}</option>
                                ) : null}
                            </select>
                            <input type="text" placeholder="Enter term" value={term} onChange={(event) => setTerm(event.target.value)} />
                            <button type="submit">Assign</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignInstructorPopup;