import React from 'react'
import { Link } from 'react-router-dom'
import {GoPackage, GoLock} from "react-icons/go"
import {BiHelpCircle} from "react-icons/bi"
import styles from "../SCSScomponents/Account.module.scss"

function Account() {
    return (
        <div className={styles.Account}>

        <div className={styles.linkContainer}>

                <Link to="/orders">
                    <GoPackage />
                    <div>
                        <p>Your orders</p>
                        <p>Track, return, or buy things again</p>
                    </div>
                </Link>

                <Link to="/account/settings/login-and-security">
                    <GoLock/>
                    <div>
                        <p>Login & Security</p>
                        <p>Track, return, or buy things again</p>
                    </div>
                </Link>

                <Link to="/help">
                    <BiHelpCircle />
                    <div>
                        <p>Help</p>
                        <p>Browse available helps topics</p>
                    </div>
                </Link>

                <Link to="/list">
                    <BiHelpCircle />
                    <div>
                        <p>List</p>
                        <p>Browse and edit your lists</p>
                    </div>
                </Link>
                
        </div>
            
        </div>
    )
}

export default Account
