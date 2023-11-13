import React, { useEffect, useState } from "react";
import "./feed.scss";
import Share from "../share/Share";
import Stories from "../stories/Stories";
// import { Posts } from "../../data";
import Post from "../post/Post";
import axios from "axios";

const Feed = () => {
    const [posts, setPosts] = useState("");
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("user"));
        let follows = userInfo.follows;
        follows.push(userInfo.id);
        let query = follows.join("&userId=");
        axios
            .get("/api/posts?userId=" + query + "&_sort=date&_order=desc")
            .then((res) => {
                setPosts(res.data);
            }
            );
    }, [])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Stories />
                <Share />
                {posts && posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}

            </div>
        </div>
    );
};

export default Feed;