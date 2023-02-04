import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import westernLogo from "../images/westernlogo.png";

import "../styles/login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/register");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        navigate("/createOutline")
        console.log(email, password);
    };

    return (<div className='flexcontainer'>
        <div className='imgcontainer'>
            <img className='westernlogo' src={westernLogo} alt="Western Text and Logo" />
        </div>
        <div className="loginbg">
            <h1 className='logintxt'>Login</h1>
            <form>
                <div>
                    <input className='email' type="email" placeholder='UWO Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className='password' type='password' placeholder='UWO Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className='loginbtn' onClick={handleSubmit}>Login</button> <br></br>
                    <button className='loginbtn' onClick={handleLoginClick}>Don't have a registered UWO account? Sign up.</button>
                </div>
            </form>
        </div>
    </div>);
}

export default Login;
