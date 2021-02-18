import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from "../SCSScomponents/ProductBig.module.scss"
import {addItemToCartAction} from "../ReduxReducers/shoppingCartReducer"
import {Link} from "react-router-dom"
import {AiFillPlaySquare} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import StarReview from './StarReview'
import CreateReview from './CreateReview'
import AddToList from './AddToList'

function ProductBig() {

    const dispatch = useDispatch()
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)

    // if (shoppingCart[0]){
    //     alert(shoppingCart[0].quantity)
    // }
    const {productID} = useParams()

    const [state, setState] = useState(()=> ({
        product: null,
        loading: true,
        currentImg: 0,
        quantity: 1,
        review: {
            average: null,
            starsPercentages: []
        }
        
    }))


    useEffect(async () => {
            try{

                const response = await fetch(`${process.env.REACT_APP_API}api/shop/product/${productID}`)

                if (response.status !== 200){
                    throw new Error("There has been an unexpected error")
                }

                const data = await response.json()

                let average = 0
                const length = data.reviews.length

                let starsObj ={
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                }

                data.reviews.forEach(review => {
                    const star = review.stars
                    average+= star
                    starsObj[star] = starsObj[star] + 1
                })

                

                console.log(starsObj)



                    setState(ps => ({
                        ...ps,
                        product: data,
                        loading: false,
                        review: {
                            average: average / length,
                            starsPercentages: [(starsObj[1]/length).toFixed(2), (starsObj[2] / length).toFixed(2), (starsObj[3]/ length).toFixed(2), (starsObj[4] / length).toFixed(2), (starsObj[5] / length).toFixed(2) ]
                        }

                    }))
                    console.log(data)
        } catch(error){
            console.log(error)
        }
        
    }, [productID])

    // const applyFocusToButton = (e) => {
    //     e.target.focus
    // }

    const addProductToBag = () => {
        dispatch(addItemToCartAction(state.product, state.quantity))
    }
    
    const increaseQuantity = () => {
        setState(ps => ({
            ...ps,
            quantity: ps.quantity + 1
        }))
    }



    const decreaseQuantity = () => {

        if (state.quantity > 1){
            setState(ps => ({
                ...ps,
                quantity: ps.quantity - 1
            }))
        }
    }

    const postReview = async (e) => {
        try{
            const response = fetch(`${process.env.REACT_APP_API}api/shop/product/reviews/post`)

            if (response.status !== 200){
                throw new Error("There has been an unexpected error")
            }

            setState(ps => ({
                ...ps,
                product: {...ps.product, reviews: [...ps.product.reviews, state.review]}
            }))



        } catch(error){
            console.log(error)
        }
    }


        //calculating the average rating
        let average = 0
        let globalRating = 0

        // state.product.reviews.forEach(review => {

            

        // })

        const changeImg = () => {

        }
        
        
    return state.product ? (

        <div className={styles.ProductBig}>

            <div className={styles.bigContainer1}>
                
                    <div className={styles.imgsSection}>
                    <img className={styles.bigImg} src={state.product.images[state.currentImg]} alt="state.product" />
                    <div className={styles.miniImgs}>
                        {state.product.images.map((img,index) => <img src={img} alt="state.product" style={{border: index === state.currentImg ? "1px solid red" : false}} onClick={()=> setState(ps => ({...ps, currentImg: index}))}/> )}
                    </div>
                </div>

                <div className={styles.detailsContainer1}>
                    <p style={{fontSize: "20px"}}>Title: {state.product.name}</p>
                    <p>Seller: <Link style={{textDecoration:"none", color: "#007185" }} to={`/${state.product.seller}`}>{state.product.seller} </Link></p>
                    <p>category: <Link to={`/shop/category/${state.product.category}`} > {state.product.category}</Link></p>

                    {state.product.sizes.length > 0 ? state.product.sizes.map(size => (<p>{size}</p>)) : false}

                    {state.product.description[0].title && state.product.description[0].info ? state.product.description.map(description => (<p>{description.title} : {description.info}</p>)) : state.product.description[0].info && !state.product.description[0].title ? state.product.description.map(description => (<p>{description.info}</p>)) : false}
                    

                </div>

                <div className={styles.detailsContainer2}>
                    <p style={{color: "red"}}>£{state.product.price.toFixed(2)}</p>

                    <p>Delivery at no extra cost for Prime Members</p>

                    <p style={{color: "green"}}>In Stock</p>


                    <div className={styles.quantity}>
                        <p>Quantity:</p> 
                        {state.quantity > 1 ? <button onClick={decreaseQuantity}>-</button> : false}
                        <p>{state.quantity}</p>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button className={styles.addToBasketBtn} onClick={addProductToBag}>
                    <div className={styles.logoContainers}>
                    <img style={{width: "25px"}} src="/images/shopping-bag.svg" alt="shopping bag"/> 
                    </div><p>Add To Basket</p>
                    </button>
                    <Link to="/shop/checkout" className={styles.buyNowBtn}>
                    <div className={styles.logoContainers}>
                    <AiFillPlaySquare size="25" />
                    </div>
                    <p>Buy Now</p></Link>
                    <AddToList product={state.product} />
                </div>
            </div>

            <div className={styles.bigContainer2}>


                <div className={styles.intro}>
                    <p>Customer reviews</p>

                    <StarReview value={state.review.average} />

                    <div className={styles.starsPercentageContainer}>
                        {state.review.starsPercentages.map((percentage,i) => 
                        <div className={styles.percentage}>
                            <p>{i+1} star</p>
                            <div style={{width: "300px", height: "20px", backgroundColor: "#e4e5e9"}}>
                                <div style={{width: `${percentage * 100}%`, height: "20px", backgroundColor: "#ffc107"}}></div>
                            </div>
                            <p>{percentage * 100}%</p>

                        </div>

                        )}
                    </div>
                    <div className={styles.createReview}>
                        <p>Review this product</p>
                        <p>Share your thoughts with other customers</p>
                        <Link to={`/review/create-review/edit/product/${state.product._id}`}>Create a review</Link>
                    </div>

                    

                </div>

                <div className={styles.reviewsContainer}>

                    {state.product.reviews.length > 0 ? state.product.reviews.map(review => (
                        <div className={styles.review}>
                            <Link to={`/${review.userID}`}>USER</Link>
                            <StarReview value={review.stars} />
                            <p>{review.headline}</p>
                            <p>{review.written}</p>
                        </div>
                    )) : <p>There are no reviews available</p>}

                </div>

            </div>



        </div>
        ) : false
}

export default ProductBig
