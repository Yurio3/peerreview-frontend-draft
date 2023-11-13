import React, { useState } from "react";
import "./register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "/assets/person/person1.jpg",
        follows: [],
        headline: "not set"

    });
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/api/users", formData).then(res => {
            alert("Account created!");
            navigate("/login");
        }).catch(err => {
            console.log(err);
            alert("err:" + err);

        });

        // Handle the response and navigate to the login page or show a success message

    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">RiceBook</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on Ricebook.
                    </span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <div className="top">
                            <img
                                src="/assets/profileCover/DefaultProfile.jpg"
                                alt=""
                                className="profileImg"
                            />
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlined className="icon" />
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        accept=".png,.jpeg,.jpg"
                                        style={{ display: "none" }}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="bottom">
                            <form className="bottomBox" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    id="username"
                                    className="registerInput"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    className="registerInput"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    className="registerInput"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    id="confirmPassword"
                                    className="registerInput"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="submit" className="registerButton">
                                    Sign Up
                                </button>
                                <Link to="/login">
                                    <button className="loginRegisterButton">
                                        Log into Account
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;