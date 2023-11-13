import {
    Close,
    EmojiEmotions,
    PermMedia,
    VideoCameraFront,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./share.scss";
import axios from "axios";

const Share = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [file, setFile] = useState(null);
    const [shareText, setShareText] = useState(""); // Added state for share text

    useEffect(()=>{
        let userInfo = JSON.parse(localStorage.getItem("user"));
        setUserInfo(userInfo);
    },[])
    const removeImage = () => {
        setFile(null);
    };

    const clearShareBox = () => {
        setFile(null);
        setShareText(""); // Clear both file and share text
    };

    const submit = () => {
        
        let post =
        {
            "userId": userInfo.id,
            "title": "",
            "body": shareText,
            "photo": "",
            "date": `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`,
            "like": "0",
            "comment": "0"
        };

        if (shareText === "") {
            alert("share text is empty");
            return;
        }

        axios
            .post("/api/posts", post)
            .then((res) => {
                alert("share success");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error submit post:", error);
            });
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={userInfo?userInfo.profilePicture:""}
                        alt=""
                        className="shareProfileImg"
                    />
                    <input
                        type="text"
                        placeholder="What's on your mind Amber ?"
                        className="shareInput"
                        value={shareText}
                        onChange={(e) => setShareText(e.target.value)} // Handle share text input
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Close className="shareCancelImg" onClick={removeImage} />
                    </div>
                )}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <VideoCameraFront
                                className="shareIcon"
                                style={{ color: "#bb0000f2" }}
                            />
                            <span className="shareOptionText">Live Video</span>
                        </div>
                        <label htmlFor="file" className="shareOption">
                            <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
                            <span className="shareOptionText">Photo/Video</span>
                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <EmojiEmotions
                                className="shareIcon"
                                style={{ color: "#bfc600ec" }}
                            />
                            <span className="shareOptionText">Feelings/Activity</span>
                        </div>
                        <button onClick={clearShareBox} className="shareClearButton">
                            Clear
                        </button>
                        <button onClick={submit} className="shareClearButton">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
