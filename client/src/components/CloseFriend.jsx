import React from 'react';
import styles from "../styles/closefriend.module.css";
import { } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Closefriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className={styles.sidebarFriend}>
            <Link to={`/profile/${user.username}`}>
                <img className={styles.sidebarFriendImg} src={PF + user.profilePicture} alt="" />
                <span className={styles.sidebarFriendName}>{user.username}</span>
            </Link>
        </li>
    )
}