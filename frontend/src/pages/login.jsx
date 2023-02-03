import React, { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (<div>
        <h1 className='logintxt'>Login</h1>
        <form>
            <input type="email" placeholder='UWO Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type='password' placeholder='UWO Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button>Login</button> <br></br>
            <button>Don't have a registered UWO account? Sign up.</button>
        </form>
    </div>);
}

export default Login;
