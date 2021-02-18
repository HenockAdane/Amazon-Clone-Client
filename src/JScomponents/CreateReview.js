import React, { useEffect, useState } from 'react'
import {FaStar} from "react-icons/fa"
import { useSelector } from 'react-redux'
import styles from "../SCSScomponents/CreateReview.module.scss"
import {useParams} from "react-router-dom"


function CreateReview(props) {

    const currentUser = useSelector(state => state.userReducer.currentUser)

    const {productID} = useParams()

    const [state, setState] = useState(()=> ({
        stars: null,
        headline: "",
        written: "",
        product: null
    }))

    useEffect(async () => {
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API}api/shop/product/${productID}`)

            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }

            const data = await response.json()

            const existingReview = data.reviews.find(review => review.authorID === currentUser._id )

            if (existingReview){
                const {stars,headline,written} = existingReview
                setState(ps => ({
                    ...ps,
                    stars: stars,
                    headline: headline,
                    written: written,
                    product: data,
                }))

            }

            else{
                setState(ps => ({
                    ...ps,
                    product: data,
                }))
            }

            

        } catch(error){
            console.log(error)
        }
    },[])

    const setInputValueToState = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }



    const postReview = async (e) => {

        e.preventDefault()


        if (!state.stars){
            alert("select a star")
        }
        else{

        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/shop/product/reviews/post`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productID: productID,
                userID: currentUser._id,
                stars: state.stars,
                headline: state.headline,
                written: state.written,

            })
        })

        console.log(response)

            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }


            const data = await response.json()

            alert("REVIEW HAS BEEN SAVED")

            setState(ps => ({
                ...ps,
                stars: null,
                headline: "",
                written: ""
            }))

            console.log(data)
        } catch(error){
            console.log(error)
        }
    }
    }

    return (
        state.product ? (<form onSubmit={postReview} className={styles.PostReview}>

            <div className={styles.intro}>
                <p>Create Review</p>

                <div>
                    <img src={state.product.images[0]} alt="Product" />
                    <p>{state.product.name}</p>
                </div>


            </div>


            <div className={styles.overallRating}>
                <p>Overall rating</p>
                <div>
                    {[...Array(5)].map((star, i) => <FaStar clasName={styles.stars} size={40} style={{color: state.stars >= (i+1) ? "#ffc107" : "#e4e5e9" }} onClick={() => setState(ps => ({
                        ...ps,
                        stars: i+1
                    }))} />)}              
                </div>

            </div>

            <div className={styles.comments}>
                <div>
                    <p>Add a headline</p>
                    <input type="text" required name="headline" placeholder="What's most important to know" value={state.headline} onChange={setInputValueToState} />
                </div>

                <div>
                    <p>Add a written review</p>
                    <textarea name="written" required placeholder="What did you like or dislike? What did you use this product for" value={state.written} onChange={setInputValueToState}></textarea>
                </div>

            </div>

            <input className={styles.submitBtn} type="submit" value="Submit" />
            
        </form>) : false
    )
}

export default CreateReview
