import React, { useEffect, useState } from 'react'
import styles from "../SCSScomponents/CheckOutProductDiv.module.scss"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {addItemToCartAction, reduceItemFromCartAction, removeItemFromCartAction} from "../ReduxReducers/shoppingCartReducer"


function CheckOutProductDiv(props) {

    const [state, setState] = useState(()=> ({
        productOpacity: 0
    }))

    useEffect(()=> {
        setState(ps => ({
            ...ps,
            productOpacity: 1
        }))
    },[])

    

    const dispatch = useDispatch()

    const product = props.product



    const increaseQuantity = () => {
        dispatch(addItemToCartAction(product))
    }

    const decreaseQuantity = () => {
        dispatch(reduceItemFromCartAction(product))
    }

    const deleteItem = ()=>{
        setState(ps => ({
            ...ps,
            productOpacity: 0
        }))
        setTimeout(()=> {
            dispatch(removeItemFromCartAction(product))
        }, 1000)
        

    }





    return (
        <div className={styles.Product} style={{opacity: state.productOpacity}}>
            <img src={product.images[0]} alt="Product" />
            <div className={styles.details}>
                <div className={styles.intro}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.price}>£{product.price.toFixed(2)}</p>
                </div>
                <p>Seller: {product.seller}</p>
                <p>In Stock</p>
                <div className={styles.quantity}>
                    <div>
                        <button onClick={decreaseQuantity} style={{borderRightStyle: "solid 1px black"}}>-</button>
                        <p>{product.quantity}</p>
                        <button onClick={increaseQuantity} style={{borderLeftStyle: "solid 1px black"}}>+</button>
                    </div>

                        <button onClick={deleteItem}>Delete</button>
                        <button>Save for later</button>
                </div>
                <Link to={`/shop/category/${product.category}`}>See more like this</Link>

            </div>
        </div>
    )
}

export default CheckOutProductDiv
