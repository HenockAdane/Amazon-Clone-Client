import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import styles from "../SCSScomponents/SignUp.module.scss"
import {Link} from "react-router-dom"
import {updateUserAction} from "../ReduxReducers/userReducer"

function SignUp() {

    const dispatch = useDispatch()
    const [state, setState] = useState(()=> ({
        name: "",
        email: "",
        password: "",
        loading: false
    }))

    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const SignUp = async (e) => {

        e.preventDefault()

        setState(ps => ({
            ...ps,
            loading: true
        }))

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/auth/account/signup`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: state.name,email: state.email, password: state.password})
            })
    
            console.log(response)
    
            
    
            if (response.status !== 200){
                throw new Error("There Has Been An Unexpected Issue")
            }
    
            const data = await response.json()
            
            if (data.user){
                dispatch(updateUserAction(data.user))
            }
    
            else{
                console.log(data.message)
            }
        } catch(error) {
            console.log(error)
        }

    }
    return (
        <div className={styles.SignUp}>

        <div className={styles.container}>
            <p style={styles.title}>Sign Up</p>

            <form onSubmit={SignUp}>
                <input type="text" name="name" required onChange={setInputValueToState} value={state.name} placeholder="Name"/>
                <input type="email" name="email" required onChange={setInputValueToState} value={state.email} placeholder="Email"/>
                <input type="password" name="password" required onChange={setInputValueToState} value={state.password} placeholder="Password"/>

                <input className={styles.submitInput} type="submit" value="Sign Up" />
            </form>


            <Link to="/auth/signin">Already have an amazon account? Sign In</Link>
        </div>
            
        </div>
    )
}

export default SignUp
