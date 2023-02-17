import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import westernLogo from "../../images/westernlogo.png";
import axios from "axios";
import passwordValidator from "password-validator";
import "../../styles/login.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInstructor, setIsInstructor] = useState(false);
    const [isAdministrator, setIsAdministrator] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let passwordRequirments = new passwordValidator();
        passwordRequirments
            .is().min(8)
            .is().max(128)
            .has().uppercase()
            .has().lowercase()
            .has().digits(1)
            .has().not().spaces();

        if (passwordRequirments.validate(password)) {
            axios.post("http://localhost:9000/api/user/register", { email: email, password: password, instructor: isInstructor, administrator: isAdministrator, reviewer: isReviewer }, { headers: { "Content-Type": "application/json" } })
                .then(res => alert(res.data))
                .catch(err => {
                    alert(JSON.stringify(err.response.data));
                });
        }

        else {
            alert(passwordRequirments.validate(password, { details: true })[0].message);
        }

    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="flexcontainer">
            <div className="imgcontainer">
                <img className="westernlogo" src={westernLogo} alt="Western Text and Logo" />
            </div>
            <div className="loginbg">
                <h1 className="logintxt">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            placeholder="UWO Email"
                            className="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="UWO Password"
                            className="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="checkboxcontainer">
                        <div>
                            <input
                                className="instructor"
                                type="checkbox"
                                checked={isInstructor}
                                onChange={(e) => setIsInstructor(e.target.checked)}
                            />
                            <label htmlFor="instructor">Instructor</label>
                        </div>
                        <div>
                            <input
                                className="administrator"
                                type="checkbox"
                                checked={isAdministrator}
                                onChange={(e) => setIsAdministrator(e.target.checked)}
                            />
                            <label htmlFor="administrator">Administrator</label>
                        </div>
                        <div>
                            <input
                                className="reviewer"
                                type="checkbox"
                                checked={isReviewer}
                                onChange={(e) => setIsReviewer(e.target.checked)}
                            />
                            <label htmlFor="reviewer">Reviewer</label>
                        </div>
                    </div>
                    <button className="loginbtn" type="submit" onClick={handleSubmit}>Submit</button>
                    <button className="loginbtn" onClick={handleLoginClick}>
                        Already have an account? Login here
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;