import React, { useState } from 'react'
import styles from "../SCSScomponents/EditEmail.module.scss"
import {updateUserAction} from "../ReduxReducers/userReducer"
import {useDispatch, useSelector} from "react-redux"

function EditEmail() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        email: ""
    }))


    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const updateEmail = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/auth/account/edit/email`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newEmail: state.email, userID: currentUser._id})
            })

            if (response.status !== 200){
                throw new Error("there has been an unexpected error")
            }

            const data = await response.json()

            dispatch(updateUserAction(data))
            localStorage.setItem("amazonCloneUser", JSON.stringify(data))

            console.log("email has been updated")

        } catch(error){
            console.log(error)
        }

    }


    return (
        <div className={styles.EditEmail}>
            <h1>Change Your Email</h1>

            <div className={styles.subContainer}>
                <p>Current email address: ....
                Enter the new email address you would like to associate with your account below. We will send a One Time Password OTP to that address.</p>

                <form onSubmit={updateEmail}>
                    <strong>New Email</strong>
                    <input type="text" name="email" required onChange={setInputValueToState} />

                    <input type="submit" className={styles.submitBtn} value="Save Changes" />
                </form>
            </div>

            
        </div>
    )
}

export default EditEmail
