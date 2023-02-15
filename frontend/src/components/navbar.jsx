import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import cookies from "js-cookie";
import axios from 'axios';
import '../styles/navbar.css';


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
            case 'Create Outline':
                console.log('Create Outline clicked');
                break;
            case 'Edit Outline':
                console.log('Edit Outline clicked');
                break;
            case 'View Outlines':
                console.log('View Outlines clicked');
                break;
            default:
                console.log('Outlines clicked');
                break;
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        cookies.remove("jwt");
        navigate("/home");
    };

    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div className="navbar-container">
            <div className="navbar-title-container">
                <h1>Western ECE Outline Management</h1>
            </div>
            <div className="navbar-dropdown-container">
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="" disabled hidden>Outlines</option>
                    <option value="Create Outline">Create Outline</option>
                    <option value="Edit Outline">Edit Outline</option>
                    <option value="View Outlines">View Outlines</option>
                </select>
            </div>
            <div className="navbar-username-container">
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
