import React from 'react';
import styles from "../styles/topbar.module.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Topbar() {

    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={styles.topbarContainer}>
            <div className={styles.topbarLeft}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className={styles.logo}>CSUN Networking</span>
                </Link>
            </div>
            <div className={styles.topbarCenter}>
                <div className={styles.searchBar}>
                    <Search className={styles.searchIcon} />
                    <input placeholder="Search for your fellow matadors!" className={styles.searchInput} />
                </div>
            </div>
            <div className={styles.topbarRight}>
                <div className={styles.topbarLink}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className={styles.topbarLink}>Homepage</span>
                    </Link>
                    <Link to={`/timeline/${user.username}`} style={{ textDecoration: "none" }}>
                        <span className={styles.topbarLink}>Timeline</span>
                    </Link>
                </div>

                <div className={styles.topbarIcons}>
                    <div className={styles.topbarIconItem}>
                        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                            <Person />
                            <span className={styles.topbarIconBadge}></span>
                        </Link>
                    </div>
                    <div className={styles.topbarIconItem}>
                        <Chat />
                        <span className={styles.topbarIconBadge}></span>
                    </div>
                    <div className={styles.topbarIconItem}>
                        <Notifications />
                        <span className={styles.topbarIconBadge}></span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "blank-profile-picture.png"} alt="" className={styles.topbarImg} />
                </Link>
            </div>
        </div >
    )
}