import React from 'react'
import styles from "../SCSScomponents/CheckOut.module.scss"
import CheckOutProductDiv from './CheckOutProductDiv'
import {useSelector, useDispatch} from "react-redux"
import {removeAllItemsFromCart} from "../ReduxReducers/shoppingCartReducer"
import {Link} from "react-router-dom"
import ProceedToCheckout from './ProceedToCheckout'
import StripeBtn from './StripeBtn'
import StripContainer from './StripContainer'



function CheckOut() {

    const dispatch = useDispatch()

    let totalQuantity= 0
    let totalPrice = 0

    const cartItems = useSelector(state => state.shoppingCartReducer.shoppingCart)
    console.log(cartItems)
    
    cartItems.forEach(product => {
        totalQuantity+= product.quantity
        totalPrice+= product.quantity * product.price
    });

console.log(cartItems)
    return (
        <div className={styles.CheckOut}>
        <div className={styles.firstHalf}>

            <div className={styles.intro}>
                <h1>Shopping Basket</h1>

                <Link onClick={()=> dispatch(removeAllItemsFromCart())}>Remove all items</Link>

            </div>

            <div className={styles.productsContainer}>
                {cartItems.length > 0 ? cartItems.map(product => (<CheckOutProductDiv
                // frontImg={product.images[0]}
                product={product}
                 />)) : false}
            </div>
        </div>

            <div className={styles.othersContainer}>
                    <StripContainer />
            </div>


            
        </div>
    )
}

export default CheckOut
