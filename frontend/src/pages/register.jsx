import React, { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInstructor, setIsInstructor] = useState(false);
    const [isAdministrator, setIsAdministrator] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log(email, password, isInstructor, isAdministrator, isReviewer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">UWO Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">UWO Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    id="instructor"
                    checked={isInstructor}
                    onChange={(e) => setIsInstructor(e.target.checked)}
                />
                <label htmlFor="instructor">Instructor</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="administrator"
                    checked={isAdministrator}
                    onChange={(e) => setIsAdministrator(e.target.checked)}
                />
                <label htmlFor="administrator">Administrator</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="reviewer"
                    checked={isReviewer}
                    onChange={(e) => setIsReviewer(e.target.checked)}
                />
                <label htmlFor="reviewer">Reviewer</label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Register;