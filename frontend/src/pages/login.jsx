import { React } from 'react';

const Login = () => {
    return (<div>
        <h1 className='logintxt'>Login</h1>
        <form>
            <input type="email" placeholder='UWO Email'></input>
            <input type='password' placeholder='UWO Password'></input>
            <button>Login</button>
            <button>Don't have a registered UWO account? Sign up.</button>
        </form>
    </div>);
}

export default Login;
