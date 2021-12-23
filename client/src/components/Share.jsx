import React, { useContext, useRef, useState } from 'react';
import styles from "../styles/share.module.css";
import profilePic from "../assets/blank-profile-picture.png";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/client.js';

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data);
            }
            catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        }
        catch (err) {

        }
    }


    return (
        <div className={styles.share}>
            <div className={styles.shareWrapper}>

                <div className={styles.shareTop}>
                    {/* src=profilePic */}
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "../assets/blank-profile-picture.png"} alt="" className={styles.shareProfileImg} />
                    <input placeholder={"Whats happening on campus " + user.username + "?"} className={styles.shareInput} ref={desc} />
                </div>
                <hr className={styles.shareHr} />
                {file && (
                    <div className={styles.shareImgContainer}>
                        <img className={styles.shareImg} src={URL.createObjectURL(file)} alt="" />
                        <Cancel className={styles.shareCancelImg} onClick={() => setFile(null)} />
                    </div>
                )}
                <form className={styles.shareBottom} onSubmit={submitHandler}>
                    <div className={styles.shareOptions}>
                        <label htmlFor="file" className={styles.shareOption}>
                            <PermMedia htmlColor="tomato" className={styles.shareIcon} />
                            <span className={styles.shareOptionText}>Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>

                    </div>
                    <button className={styles.shareButton} type="submit">Share</button>
                </form>

            </div>
        </div>
    )
}