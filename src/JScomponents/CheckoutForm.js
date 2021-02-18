import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {removeAllItemsFromCart} from "../ReduxReducers/shoppingCartReducer"
import {updateUserAction} from "../ReduxReducers/userReducer"
import { CardElement, useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import styles from "../SCSScomponents/CheckoutForm.module.scss"

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.shoppingCartReducer.shoppingCart)
  const currentUser = useSelector(state => state.userReducer.currentUser)

  const [state, setState] = useState(()=> ({
    showModule: false
  }))

  let cartItemsTotalPrice = 0;

  cartItems.forEach(item => {
      cartItemsTotalPrice+= item.quantity * item.price
  })

  const handleSubmit = async (event) => {
    event.preventDefault();


    try{
        const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        });

        if (!error) {
            console.log("Stripe 23 | token generated!", paymentMethod);
            //send token to backend here
            const response = await fetch(`${process.env.REACT_APP_API}api/payment/charge`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({amount: (cartItemsTotalPrice * 100).toFixed(0), products: cartItems, paymentID: paymentMethod.id, userID: currentUser._id})
                })
        
            if (response.status !== 200){
                throw new Error("Payment has failed")
            }

            const data = await response.json()

            dispatch(updateUserAction(data.user))
            localStorage.setItem("amazonCloneUser", JSON.stringify(data.user))

            toggleModule()

            dispatch(removeAllItemsFromCart())

            console.log("payment has gone through")
        }
        
        else {
        console.log(error.message);
        }
    } catch(error){
        console.log(error)
    }
  };

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      fontSize: "40px",
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '40px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#fce883'},
        '::placeholder': {color: '#87bbfd'},
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  const toggleModule = () => {
    setState(ps => ({
      ...ps,
      showModule: !ps.showModule
    }))
  }

  return (
    <div>
      {!state.showModule && cartItems.length === 0 ? <h1>There are no items in your basket</h1>: !state.showModule ? (<form className={styles.form} options={CARD_OPTIONS} onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <CardElement className={styles.cardElement}/>
        <button>Pay</button>
      </form>) : (<div className={styles.module}>
        <h1>Your payment has gone through, thank you</h1>
        <button onClick={toggleModule}>EXIT</button>
        
      </div>)}
    </div>
  );
};

export default CheckoutForm