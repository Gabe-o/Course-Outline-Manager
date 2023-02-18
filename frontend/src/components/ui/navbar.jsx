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
    const [role, setRole] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9000/api/allUsers/info", { headers: { "token": cookies.get("jwt") } })
            .then(res => {
                let role = {
                    instructor: false,
                    administrator: false,
                    reviewer: false
                }
                setAuthenticated(true);
                setUsername(res.data.email.split("@")[0]);
                if (res.data.instructor === 1) {
                    role.instructor = true;
                }
                if (res.data.administrator === 1) {
                    role.administrator = true;
                }
                if (res.data.reviewer === 1) {
                    role.reviewer = true;
                }
                setRole(role);
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
        let htmlArray = [];
        if (role.instructor) {
            const instructor = <div>
                <select value={instructorSelectedOption} onChange={handleInstructorOptionChange}>
                    <option value="" disabled hidden>Outlines</option>
                    <option value="Your Outlines">Your Outline</option>
                    <option value="View Outlines">View Outlines</option>
                </select>
            </div>
            htmlArray.push(instructor);
        }
        if (role.administrator) {
            const administrator = <div>
                <select value={administratorSelectedOption} onChange={handleAdministratorOptionChange}>
                    <option value="" disabled hidden>Courses</option>
                    <option value="Add Course">Add Course</option>
                    <option value="Assign Instructor">Assign Instructor to Course</option>
                </select>
            </div>
            htmlArray.push(administrator);

        }
        if (role.reviewer) {
            const reviewer = <div>
                <button>Reviewer TO DO</button>
            </div>
            htmlArray.push(reviewer);
        }
        const elements = htmlArray.map((element) => {
            return element;
        });

        return elements;
    }

    const displayRoles = () => {
        let roleArray = [];
        if (role.instructor) {
            roleArray.push("instructor");
        }
        if (role.administrator) {

            roleArray.push("administrator");

        }
        if (role.reviewer) {
            roleArray.push("reviewer");
        }
        const elements = roleArray.reduce((acc, curr, i) => {
            if (i === roleArray.length - 1) {
                return acc + curr; // Don't add comma for the last element
            } else {
                return acc + curr + ", "; // Add comma for other elements
            }
        }, "");

        return elements;
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
                            <p>{username + " (" + displayRoles() + ")"}</p>
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
