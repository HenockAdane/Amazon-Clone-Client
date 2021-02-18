  
import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import {removeAllItemsFromCart} from "../ReduxReducers/shoppingCartReducer"
import { updateUserAction } from '../ReduxReducers/userReducer'

function StripeBtn(props) {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.userReducer.currentUser)
    console.log(props.cartItemsTotalPrice)
    

    let stripePrice = Number((props.cartItemsTotalPrice * 100).toFixed(0))
    console.log(typeof stripePrice)

    const onToken = async token => {
        const response = fetch(`${process.env.REACT_APP_API}shop/payment`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: stripePrice,
                token,
                newOrder: {
                orderDate: new Date(),
                products: props.cartItems,
                totalPrice: props.cartItemsTotalPrice,    
                }
            })
        })

        if (response.status === 200){
            throw new Error("There has been an unexpected Error")
        }

        const data = await response.json()

        console.log(data)
        alert("Payment Successful")

        dispatch(removeAllItemsFromCart())
        dispatch(updateUserAction(data.user))
        localStorage.setItem("amazonCloneUser", JSON.stringify(data.user))


            


    }
    return (
        <StripeCheckout
        image="https://svgshare.com/i/CUz.svg"
        label="PAY BY CARD"
        name="AMAZON"
        email={currentUser ? currentUser.email : ""}
        billingAddress
        shippingAddress
        local="en"
        currency="GBP"
        panelLabel="Pay Now"
        amount= {stripePrice}
        allowRememberMe={true}
        stripeKey={process.env.REACT_APP_STRIPEKEY}
        token={onToken}

        />
    )
}

export default StripeBtn