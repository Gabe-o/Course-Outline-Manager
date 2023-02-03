import React, { useState } from "react";

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here, such as making a API call to authenticate the user
        console.log(`User ID: ${userId} Password: ${password}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User ID:
                <input
                    type="text"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;