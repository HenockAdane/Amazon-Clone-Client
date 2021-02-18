import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import styles from "../SCSScomponents/Lists.module.scss"

function Lists() {

    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        listNames: null,
        chosenListTitle: "",
        listItems: null
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


    const getListByName = async (e) => {
        const {value} = e.target
        console.log(value)
        console.log(1)

        try{

            const response = await fetch(`${process.env.REACT_APP_API}api/list/getListByName/${currentUser._id}/${value}`)

            if (response.status !== 200){
                throw new Error("There has been an issue with getting list content")
            }

            const data = await response.json()

            setState(ps => ({
                ...ps,
                listItems: data.list[0].items
            }))

            console.log(data)

            
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div>

        <div className={styles.listTitles}>

            {state.listNames ? state.listNames.map(name => 
            <input type="button" value={name} onClick={getListByName} />
            ) : (<p>You do not currently have any lists</p>)}
        

        </div>

        <div classNames={styles.listItemsContainer}>
                {state.listItems ? state.listItems.map(item => (<Link to={item._id}>{item.name}</Link>)) : <p>"There are no items in this list"</p>}
        </div>
            
        </div>
    )
}

export default Lists
/*
[{ listTitle: "dfdf", list: ["items"] }]
use map to list all titles

use filter to get a single list
*/