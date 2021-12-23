import React from 'react';
import styles from "../styles/rightbar.module.css";
import { } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className={styles.rightbarFriend}>
            <div className={styles.rightbarProfileImgContainer}>
                <img className={styles.rightbarProfileImage} src={PF + user.profilePicture} alt="" />
                <span className={styles.rightbarOnline}>
                </span>

            </div>
            <span className={styles.rightbarUsername}>
                <Link to={`/profile/${user.username}`}>
                    {user.username}
                </Link>

            </span>
        </li >
    )
}