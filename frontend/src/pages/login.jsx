import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import cookies from 'js-cookie';
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
        axios.post("http://localhost:9000/api/user/login", { email: email, password: password }, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                const now = new Date();
                cookies.set('jwt', res.data, { expires: new Date(now.getTime() + (60 * 60 * 1000)) })
                navigate("/createOutline");
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data));
            });


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
