import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../misc/authContext';
import cookies from "js-cookie";
import axios from 'axios';
import '../../styles/navbar.css';


const Navbar = () => {

    const [selectedOption, setSelectedOption] = useState('');
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

    const handleOptionChange = (event) => {
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
                    <select value={selectedOption} onChange={handleOptionChange}>
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
                    <button>Admin TO DO</button>
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
    );
};

export default Navbar;
