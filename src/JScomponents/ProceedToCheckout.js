import React from 'react'
import styles from "../SCSScomponents/ProceedToCheckout.module.scss"
import { Link } from 'react-router-dom'

function ProceedToCheckout(props) {
    return (
        <div className={styles.Container}>


        <p>Subtotal &#40;{props.totalQuantity} items&#41;: <strong>£{props.totalPrice}</strong></p>
        
        <Link to="/shop/checkout">Proceed to Checkout</Link>
        </div>
    )
}

export default ProceedToCheckout
