import React, { useState } from 'react'
import styles from "../SCSScomponents/EditPassword.module.scss"
import {updateUserAction} from "../ReduxReducers/userReducer"
import {useDispatch, useSelector} from "react-redux"

function EditPassword() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    }))


    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const updatePassword = async (e) => {
        e.preventDefault()

        //making sure the new password and the confirmed password match

        if (state.newPassword === state.confirmPassword){

            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/auth/account/edit/password`, {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({currentPassword: state.currentPassword, newPassword: state.newPassword, userID: currentUser._id})
                })

                if (response.status !== 200){
                    throw new Error("there has been an unexpected error")
                }

                const data = await response.json()

                console.log(data)

                if (data.user){
                    dispatch(updateUserAction(data.user))
                localStorage.setItem("amazonCloneUser", JSON.stringify(data.user))

                console.log("password has been updated")
                }

                else{
                    console.log(data.message)
                }

            } catch(error){
                console.log(error)
            }
        }

        else{
            console.log("Passwords must match")
        }

    }


    return (
        <div className={styles.EditPassword}>
            <h1>Change Your Password</h1>

            <div className={styles.subContainer}>
                <p>If you want to change the name associated with your Amazon customer account, you may do so below. Make sure that you click the <strong>Save Changes</strong> button when you have finished.</p>

                <form onSubmit={updatePassword}>
                    <strong>Current Password</strong>
                    <input type="password" name="currentPassword" placeholder="Current Password" required onChange={setInputValueToState} />
                    <strong>New Password</strong>
                    <input type="password" name="newPassword" placeholder="New Password" required onChange={setInputValueToState} />
                    <strong>Confirm New Password</strong>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={setInputValueToState} />
                    {state.newPassword}
                    {state.confirmPassword}

                    <input type="submit" className={styles.submitBtn} value="Save Changes" />
                </form>
            </div>

            
        </div>
    )
}

export default EditPassword
