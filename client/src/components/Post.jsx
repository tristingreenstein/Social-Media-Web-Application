import React, { useContext, useEffect, useState } from 'react';
import styles from "../styles/post.module.css";
import { MoreVert } from "@material-ui/icons";
import axios from 'axios';
import likeIcon from "../assets/likeIcon.png";   // 14:27 changed into `${PF}likeIcon.png` down, but did not work
import heartIcon from "../assets/heartIcon.png";  // 14:27 changed into `${PF}heartIcon.png` down, but did not work
//import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
//import { Users } from "../dummyData.js";


export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLike] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLike(post.likes.includes(currentUser._id))

    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("feed rendered");
            const res = await axios.get(`/users?userId=${post.userId}`);
            //console.log(res);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        }
        catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLike(!isLiked)
    }
    return (
        <div>
            <div className={styles.post} >
                <div className={styles.postWrapper}>
                    <div className={styles.postTop}>
                        <div className={styles.postTopLeft}>
                            <Link to={`profile/${user.username}`}>
                                <img className={styles.postProfileImg} src={user.profilePicture ? PF + user.profilePicture : PF + "blank-profile-picture.png"} alt="" />
                            </Link>
                            <span className={styles.postUsername}>
                                {user.username}
                            </span>
                            <span className={styles.postDate}>
                                {post.createdAt}
                            </span>
                        </div>
                        <div className={styles.postTopRight}>
                            <MoreVert />
                        </div>
                    </div>
                    <div className={styles.postCenter}>
                        <span className={styles.postText}>
                            {post?.desc}
                        </span>
                        <img className={styles.postImage} src={PF + post.img} alt="" />

                    </div>
                    <div className={styles.postBottom}>
                        <div className={styles.postBottomLeft}>
                            <img className={styles.likeIcon} src={likeIcon} onClick={likeHandler} alt="" />
                            <img className={styles.likeIcon} src={heartIcon} onClick={likeHandler} alt="" />
                            <span className={styles.postLikeCounter}>
                                {like} people like it
                            </span>
                        </div>
                        <div className={styles.PostBottomRight}>
                            <span className={styles.postCommentText}>
                                {post.comment} comments
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}