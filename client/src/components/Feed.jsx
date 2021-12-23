import React, { useContext, useEffect, useState } from 'react';
import styles from "../styles/feed.module.css";
import Share from "./Share.jsx";
import Post from "./Post.jsx"
import axios from '../utils/client.js';
import { AuthContext } from '../context/AuthContext';
// import { Posts } from "../dummyData.js";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    //  const [text,setText] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            console.log("feed rendered");
            const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("posts/timeline/" + user._id); //61b0fca4c2f0af06bd33fb3f
            //console.log(res);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className={styles.feed}>
            <div className={styles.feedWrapper}>
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                )
                )
                }
            </div>
        </div>
    );
}