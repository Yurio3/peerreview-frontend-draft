/*import React, { Component } from 'react';*/
import React from "react";
import "./friends.scss";
import axios from "axios";


const Friends = ({ user }) => {
    const handleUnfollow = () => {
        let currentUser = JSON.parse(localStorage.getItem("user"));
        currentUser.follows.splice(currentUser.follows.indexOf(user.id), 1);
        axios
            .put(`/api/users/${currentUser.id}`, currentUser)
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.reload();
            }
            );
    };

    return (

        <li className="sidebarFriend">
            <img
                src={user.profilePicture}
                alt=""
                className="sidebarFriendImg" />
            <div className="sidebarFriendInfo">
                <span className="sidebarFriendName">{user.name}</span>
                <p className="sidebarFriendTitle">{user.title}</p>
                <div>{user.headline}</div>
                <button className="btn btn-primary" onClick={handleUnfollow}>Unfollow</button>
            </div>
        </li>


    );
};

export default Friends;