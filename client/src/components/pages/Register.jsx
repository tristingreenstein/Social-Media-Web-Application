import React from 'react';
import styles from "../../styles/register.module.css";
import { useRef } from 'react';
import { useHistory } from "react-router"
import axios from '../../utils/client.js';
import { } from "@material-ui/icons";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleLoginRedirect = (e) => {
        history.push('/login')
    }

    return (
        <div>
            <div className={styles.login}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginLeft}>
                        <h3 className={styles.loginLogo}>CSUN Networking</h3>
                        <span className={styles.loginDesc}>
                            Come join your fellow matadors on CSUN Networking!
                        </span>
                    </div>
                    <div className={styles.loginRight}>
                        <form className={styles.loginBox} onSubmit={handleClick}>
                            <input placeholder="Username" required ref={username} className={styles.loginInput} />
                            <input placeholder="Email" type="email" required ref={email} className={styles.loginInput} />
                            <input placeholder="Password" type="password" minLength="6" required ref={password} className={styles.loginInput} />
                            <input placeholder="Confirm Password" type="password" required ref={passwordAgain} className={styles.loginInput} />
                            <button className={styles.loginButton} type="submit">
                                Sign Up
                            </button>
                            <button className={styles.loginRegisterButton} onClick={handleLoginRedirect}>
                                Login to Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}