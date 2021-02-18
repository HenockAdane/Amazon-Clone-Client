import React, { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import styles from "../SCSScomponents/SignIn.module.scss"
import {Link} from "react-router-dom"
import {updateUserAction} from "../ReduxReducers/userReducer"

function SignIn() {

    const dispatch = useDispatch()
    const [state, setState] = useState(()=> ({
        email: "exhzimlhddryhlleun@miucce.com",
        password: "Password",
        rememberMe: true,
        loading: false
    }))

    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const setInputCheckToState = (e)=>{
        const {name} = e.target

        setState(ps => ({
            ...ps,
            [name]: !ps.[name]
        }))
    }

    const signIn = async (e) => {

        e.preventDefault()

        setState(ps => ({
            ...ps,
            loading: true
        }))

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/auth/account/signin`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: state.email, password: state.password})
            })

            if (response.status !== 200){
                throw new Error("There Has Been An Unexpected Issue")
            }

            const data = await response.json()

                console.log(data)

            if (data.user){
                dispatch(updateUserAction(data.user))
                

                if (state.rememberMe){
                    localStorage.setItem("amazonCloneUser", JSON.stringify(data.user))
                }
            }

            else{
                console.log(data.message)
            }
        } catch(error){
            console.log(error)
        }

    }
    return (
        <div className={styles.SignIn}>

        <div className={styles.container}>
            <p style={styles.title}>Sign In</p>

            <form onSubmit={signIn}>
                <input type="email" name="email" required onChange={setInputValueToState} value={state.email} placeholder="Email"/>
                <input type="password" name="password" required onChange={setInputValueToState} value={state.password} placeholder="Password"/>
                <div>
                    <input type="checkbox" name="rememberMe" onChange={setInputCheckToState} checked={state.rememberMe} />
                <label for="rememberMe">Remember Me</label>
                </div>
                <input className={styles.submitInput} type="submit" value="Sign In" />
            </form>


            <Link to="/auth/signup">Create your amazon account</Link>
        </div>
            
        </div>
    )
}

export default SignIn
