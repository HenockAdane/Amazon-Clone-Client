import React, { useState } from 'react'
import styles from "../SCSScomponents/EditName.module.scss"
import {updateUserAction} from "../ReduxReducers/userReducer"
import {useDispatch, useSelector} from "react-redux"

function EditName() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        name: ""
    }))


    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const updateName = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/auth/account/edit/name`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newName: state.name, userID: currentUser._id})
            })

            if (response.status !== 200){
                throw new Error("there has been an unexpected error")
            }

            const data = await response.json()

            dispatch(updateUserAction(data))
            localStorage.setItem("amazonCloneUser", JSON.stringify(data))

            console.log("name has been updated")

        } catch(error){
            console.log(error)
        }

    }


    return (
        <div className={styles.EditName}>
            <h1>Change Your Name</h1>

            <div className={styles.subContainer}>
                <p>If you want to change the name associated with your Amazon customer account, you may do so below. Make sure that you click the <strong>Save Changes</strong> button when you have finished.</p>

                <form onSubmit={updateName}>
                    <strong>New Name</strong>
                    <input type="text" name="name" required onChange={setInputValueToState} />

                    <input type="submit" className={styles.submitBtn} value="Save Changes" />
                </form>
            </div>

            
        </div>
    )
}

export default EditName
