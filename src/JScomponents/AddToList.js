import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import styles from "../SCSScomponents/AddToList.module.scss"
import {AiOutlineArrowDown, AiOutlinePlus} from "react-icons/ai"

function AddToList(props) {

    const currentUser = useSelector(state => state.userReducer.currentUser)


    const [state, setState] = useState(()=> ({
        listNames: null,
        newListName: "",
        modalDisplay: false
    }))

    useEffect(async ()=> {
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/list/getAllListNames/${currentUser._id}`)

            if (response.status !== 200){
                throw new Error("there has been an unexpected error")
            }

            const data = await response.json()

            setState(ps => ({
                ...ps,
                listNames: data.listNames
            }))

            console.log(data)

        } catch(error){
            console.log(error)
        }
    }, [])

    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    const createNewList = async (e) => {

        e.preventDefault()

        // setState(ps => ({
        //     ...ps,
        //     loading: true
        // }))

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/list/create`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userID: currentUser._id, newListName: state.newListName})
            })

            if (response.status !== 200){
                throw new Error("There Has Been An Unexpected Issue")
            }

            const data = await response.json()

            toggleModal()

                console.log(data)

            
        } catch(error){
            console.log(error)
        }

    }

    const addToList = async (e) => {
        
        const {value} = e.target
        console.log(value)

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/list/add`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userID: currentUser._id, product: props.product, listName: value})
            })

            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }

            const data = await response.json()

            console.log(data)


        }
        catch(error){
            console.log(error)
        }
    }

    console.log(props.product)

    const toggleModal = () => {
        setState(ps => ({
            ...ps,
            modalDisplay: !ps.modalDisplay
        }))
        console.log("toggle")
    }

    return (
        <div className={styles.AddToList}>

            {currentUser ? (<button className={styles.mainBtn}>
                <span>Add To List</span>
                <AiOutlineArrowDown />                
            </button>) : <Link to="/auth/signin"  className={styles.mainBtn}>
                <span>Add To List</span>
                <AiOutlineArrowDown />
            </Link>}

            <div className={styles.dropdown} >

                <div className={styles.namesContainer}>
                    {state.listNames ? state.listNames.map(name =>  <input type="button" onClick={addToList} value={name} />) : <p>There are no lists</p>}

                </div>

                
                
                
                <button className={styles.addBtn} onClick={toggleModal}>
                    <AiOutlinePlus/>
                    <span>Create A New List</span>
                </button>
            </div>

            <div className={styles.listModal}  style={state.modalDisplay ? {display: "flex"} : {display: "none"}}>
                <form onSubmit={createNewList}>
                    <input type="text" name="newListName" required value={state.newListName} placeholder="New List Name" onChange={setInputValueToState} />

                    <input type="submit" value="Add New List" /> 
                </form>
            </div>
            
        </div>
    )
}

export default AddToList
