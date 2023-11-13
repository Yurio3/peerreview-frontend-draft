import React, { useEffect, useState } from "react";
import Friends from "../friends/Friends";
import "./sidebar.scss";
import axios from "axios";

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("user"));
        axios.get("/api/users/" + userInfo.id).then((res) => {
            setUserInfo(res.data);
            let follows = res.data.follows;
            if (follows.length > 0) {
                let query = follows.join("&id=");
                let users = [];
                axios.get("/api/users?id=" + query).then((res) => {
                    setUsers(res.data);
                    users = users.concat(res.data);
                    axios.get("/api/Usersonline?id=" + query).then((res) => {
                        users = users.concat(res.data);
                        setUsers(users);
                    });
                });
            }
        });
    }, []);

    const handleUpdate = () => {
        const newHeadline = document.getElementById("input-status").value;
        userInfo.headline = newHeadline;
        axios
            .put("/api/users/" + userInfo.id, userInfo)
            .then((res) => {
                setUserInfo(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                document.getElementById("input-status").value = "";
            })
            .catch((error) => {
                console.error("Error updating headline:", error);
            });
    };


    const handleAdd = () => {
        const newFollow = document.getElementById("input-follow").value;
        //check if user existed
        axios.get("/api/users?email=" + newFollow).then(res => {
            if (res.data.length == 0) {
                axios.get("/api/usersonline?email=" + newFollow).then(res => {
                    if (res.data.length == 0) {
                        alert("User not found")
                        return;
                    } else {
                        userInfo.follows.push(res.data[0].id);
                        axios
                            .put("/api/users/" + userInfo.id, userInfo)
                            .then((res) => {
                                localStorage.setItem("user", JSON.stringify(res.data));
                                window.location.reload();
                            })
                            .catch((error) => {
                                // 处理错误
                                console.error("Error adding follow:", error);
                            });
                    }

                })
                return;
            } else {
                userInfo.follows.push(res.data[0].id);
                axios
                    .put("/api/users/" + userInfo.id, userInfo)
                    .then((res) => {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        window.location.reload();
                    })
                    .catch((error) => {
                        // 处理错误
                        console.error("Error adding follow:", error);
                    });
            }
        })

    };


    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="main-head">
                    <h3>Profile:</h3>
                    <div className="row">
                        <img src={userInfo.profilePicture} alt=" " className="profileImg" />
                        <div>{userInfo.name}</div>
                        <div className="user-status">{userInfo.headline}</div>
                    </div>
                    <div className="row">
                        <input type="text" placeholder="new status" id="input-status" />
                        <button className="btn btn-primary" id="updateBtn" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>

                <div className="sidebarFriendBorder">
                    <ul className="sidebarFriendList">
                        {users.map((user) => (
                            <Friends key={user.id} user={user} />
                        ))}
                    </ul>
                    <div className="add">
                        <input type="text" placeholder="enter user's email" id="input-follow" />
                        <button className="btn" onClick={handleAdd}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;