


import { DriveFolderUploadOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./editProfile.scss";
import axios from "axios";

const EditProfile = () => {
    // Initialize state to store user profile data
    const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem("user")));

    // State to track if the user is currently editing the profile
    const [isEditing, setIsEditing] = useState(false);

    // Handler for updating the user profile data
    const updateProfile = () => {
        // Implement logic to update the user's profile using the form data
        // You can make an API call or update the state accordingly
        // For now, this example just logs the updated data
        console.log("Updated Profile Data:", profileData);
        axios.put("/api/users/"+profileData.id, profileData).then(res=>{
            alert("Profile Updated")
            localStorage.setItem("user", JSON.stringify(res.data))
        })
        // Set isEditing to false after successful update
        setIsEditing(false);
    };
    useEffect(() => {

    }, [])

    // Handler for handling file input change (for avatar)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Implement logic to upload the selected file (image) here
        // For now, this example just logs the selected file
        console.log("Selected File:", file);
    };

    // Handler for input changes (except avatar)
    const handleInputChange = (event, fieldName) => {
        const value = event.target.value;
        setProfileData({
            ...profileData,
            [fieldName]: value,
        });
    };

    return (
        <div className="editProfile">
            <Navbar />
            <div className="editProfileWrapper">
                <div className="profileRight">
                    <div className="profileRightTop">
                        {/* Profile Cover and User Avatar */}
                        <div className="profileCover">
                            <img src="/assets/profileCover/profilecover.jpg" alt="" className="profileCoverImg" />
                            <img src={profileData.profilePicture} alt="" className="profileUserImg" />
                            {isEditing ? (
                                <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
                            ) : null}

                        </div>
                        {/* Profile Information */}
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{profileData.name}</h4>
                            <span className="profileInfoDesc">Hi Friends!</span>
                        </div>
                    </div>
                    {/* Edit Profile Form */}
                    <div className="editprofileRightBottom">
                        <div className="top">
                            <h1>Edit User Profile</h1>
                        </div>
                        <div className="bottom">

                            <div className="right">
                                <img src={profileData.profilePicture} alt="" />
                                <form>

                                    <div className="formInput">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={profileData.username}
                                           
                                            placeholder=""
                                            onChange={(e) => handleInputChange(e, "username")}
                                        />
                                    </div>
                                    <div className="formInput">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={profileData.password}
                                           
                                            placeholder="********"
                                            onChange={(e) => handleInputChange(e, "password")}
                                        />
                                    </div>
                                    <div className="formInput">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                           
                                            placeholder=""
                                            onChange={(e) => handleInputChange(e, "email")}
                                        />
                                    </div>
                                    <div className="formInput">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            value={profileData.phone}
                                           
                                            placeholder=""
                                            onChange={(e) => handleInputChange(e, "phone")}
                                        />
                                    </div>
                                    <div className="formInput">
                                        <label>Zipcode</label>
                                        <input
                                            type="text"
                                            value={profileData.zipcode}
                                           
                                            placeholder=""
                                            onChange={(e) => handleInputChange(e, "zipcode")}
                                        />
                                    </div>
                                    <button type="button" className="updateButton" onClick={updateProfile}>
                                        Update Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
