import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.get(`/api/users?email=${email}&password=${password}`).then(res => {
            if (res.data.length > 0) {
                localStorage.setItem("user", JSON.stringify(res.data[0]));
                alert("Login success!");
                navigate("/home");
            }
        }).catch(err => {
            console.log(err);
            alert("err:" + err);

        });
        /*navigate("/home");*/

    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">RiceBook</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Ricebook.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <div className="bottom">
                            <form className="bottomBox">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    className="loginInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    className="loginInput"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Link to="/home">
                                    <button type="submit" className="loginButton" onClick={handleLogin}>
                                        Sign In
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button className="loginRegisterButton">
                                        Create a New Account
                                    </button>
                                </Link>
                            </form>
                        </div>
                        <div>
                            {/*<h1>
                                Please don't peer review my homework early,
                                Buz I need to add backend to this project,
                                Otherwise, there's no way to log in to this project.
                            </h1>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;