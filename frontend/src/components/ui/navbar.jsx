import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CreateCoursePopup from './createCoursePopup';
import AssignInstructorPopup from './assignInstructorPopup';
import AuthContext from '../misc/authContext';
import cookies from "js-cookie";
import axios from 'axios';
import '../../styles/navbar.css';


const Navbar = () => {

    const [instructorSelectedOption, setInstructorSelectedOption] = useState('');
    const [administratorSelectedOption, setAdministratorSelectedOption] = useState('');
    const [showCoursePopup, setShowCoursePopup] = useState(false);
    const [showAssignInstructorPopup, setShowAssignInstructorPopup] = useState(false);
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9000/api/allUsers/info", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                console.log("Entered");
                setAuthenticated(true);
                setUsername(res.data.email.split("@")[0]);
                if (res.data.instructor === 1) {
                    setRole("instructor");
                }
                else if (res.data.administrator === 1) {
                    setRole("administrator");
                }
                else {
                    setRole("reviewer");
                }
            })
            .catch(err => {
                setAuthenticated(false);
            });
    }, [authenticated]);

    const handleInstructorOptionChange = (event) => {
        switch (event.target.value) {
            case 'Your Outlines':
                navigate("/outlineManagement");
                break;
            case 'Edit Outline':
                break;
            case 'View Outlines':
                break;
            default:
                break;
        }
    };

    const handleAdministratorOptionChange = (event) => {
        switch (event.target.value) {
            case 'Add Course':
                setShowCoursePopup(true);
                break;
            case 'Assign Instructor':
                setShowAssignInstructorPopup(true);
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        cookies.remove("jwt");
        navigate("/home");
        setAuthenticated(false);
        window.location.reload(false);
    };

    const handleLogin = () => {
        navigate("/login");
        window.location.reload(false);
    }

    const navBarContents = () => {
        if (role === "instructor") {
            return (
                <div>
                    <select value={instructorSelectedOption} onChange={handleInstructorOptionChange}>
                        <option value="" disabled hidden>Outlines</option>
                        <option value="Your Outlines">Your Outline</option>
                        <option value="View Outlines">View Outlines</option>
                    </select>
                </div>
            );
        }
        else if (role === "administrator") {
            return (
                <div>
                    <select value={administratorSelectedOption} onChange={handleAdministratorOptionChange}>
                        <option value="" disabled hidden>Courses</option>
                        <option value="Add Course">Add Course</option>
                        <option value="Assign Instructor">Assign Instructor to Course</option>
                    </select>
                </div>
            );
        }
        else if (role === "reviewer") {
            return (
                <div>
                    <button>Reviewer TO DO</button>
                </div>
            );
        }
        else {
            return null;
        }
    }

    return (
        <div>
            <div className="navbar-container">
                <div>
                    <h1>Western ECE Outline Management</h1>
                </div>
                {navBarContents()}
                <div>
                    {authenticated ?
                        <div>
                            <p>{username + " (" + role + ")"}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div> :
                        <div>
                            <p>Guest</p>
                            <button onClick={handleLogin}>Login</button>
                        </div>}
                </div>
            </div>
            {showCoursePopup ? <CreateCoursePopup showCoursePopup={showCoursePopup} setShowCoursePopup={setShowCoursePopup} /> : null}
            {showAssignInstructorPopup ? <AssignInstructorPopup showAssignInstructorPopup={showAssignInstructorPopup} setShowAssignInstructorPopup={setShowAssignInstructorPopup} /> : null}
        </div>
    );
};

export default Navbar;
