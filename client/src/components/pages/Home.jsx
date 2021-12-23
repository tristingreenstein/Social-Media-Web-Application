import React from 'react';
import Sidebar from '../Sidebar.jsx';
import Topbar from "../Topbar.jsx";
import Feed from "../Feed.jsx";
import Rightbar from "../Rightbar.jsx";
import styles from "../../styles/Home.module.css";

export default function Home() {
    return (
        <>
            <Topbar />
            <div className={styles.homeContainer}>
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}