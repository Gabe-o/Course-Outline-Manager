import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        console.log(email, password);
    };

    return (<div>
        <h1 className='logintxt'>Login</h1>
        <form>
            <input className='email' type="email" placeholder='UWO Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className='password' type='password' placeholder='UWO Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleSubmit}>Login</button> <br></br>
            <button onClick={handleLoginClick}>Don't have a registered UWO account? Sign up.</button>
        </form>
    </div>);
}

export default Login;
