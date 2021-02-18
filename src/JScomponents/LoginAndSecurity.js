import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from "../SCSScomponents/LoginAndSecurity.module.scss"

function LoginAndSecurity() {

    const currentUser = useSelector(state => state.userReducer.currentUser)
    return (
        <div className={styles.LoginAndSecurity}>

        <div className={styles.intro}>
            <h1>Login & Security</h1>
        </div>


        <div className={styles.optionsContainer}>

            <div className={styles.options}>
                <div>
                    <p>Name:</p>
                    <p>{currentUser.name}</p>
                </div>
                <Link className={styles.editBtn} to="/account/settings/login-and-security/edit/name">Edit</Link>
            </div>

            <div className={styles.options}>
                <div>
                    <p>Email:</p>
                    <p>{currentUser.email}</p>
                </div>
                <Link className={styles.editBtn} to="/account/settings/login-and-security/edit/email">Edit</Link>
            </div>

            <div className={styles.options}>
                <div>
                    <p>Password:</p>
                    <p>********</p>
                </div>
                <Link className={styles.editBtn} to="/account/settings/login-and-security/edit/password">Edit</Link>
            </div>

        </div>

        <Link className={styles.doneBtn} to="/account">Done</Link>


            
        </div>
    )
}

export default LoginAndSecurity
