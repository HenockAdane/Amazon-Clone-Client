import React from 'react'
import {useDispatch } from 'react-redux'
import {addItemToCartAction, reduceItemFromCartAction} from "../ReduxReducers/shoppingCartReducer"
import styles from "../SCSScomponents/CartItemDiv.module.scss"

function CartItemDiv(props) {

    const dispatch = useDispatch()
    const addQuantity = () => {    
        dispatch(addItemToCartAction({...props.cartItem}))
        console.log(JSON.parse(localStorage.getItem("cartItems"))[0])
    }


    const reduceQuantity = () => {
        dispatch(reduceItemFromCartAction({...props.cartItem}))
        console.log("CLICK REDUCE",  props.cartItem)
    }
    
    return (
         <div className={styles.cartItem}>
            {/* <img className={styles.cartItemImg} src={`${props.cartItem.images[0]}`} alt={props.cartItem.title} />
            <div className={styles.itemDetails}>
                <h5>{props.cartItem.title}</h5>
                <p>Size:{props.cartItem.size}</p>
                <p>{props.cartItem.quantity} X £{props.cartItem.price}</p> */}

                <button onClick={addQuantity}>+</button>
                <button onClick={reduceQuantity}>-</button>
            {/* </div> */}

            
        </div>
    )
}

export default CartItemDiv