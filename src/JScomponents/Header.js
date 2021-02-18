import React, { useState } from 'react'
import styles from "../SCSScomponents/Header.module.scss"
import {BsSearch} from "react-icons/bs"
import CartItemDiv from "./CartItemDiv"
import {useSelector, useDispatch} from "react-redux"
import {updateUserAction} from "../ReduxReducers/userReducer"

import {Link} from "react-router-dom"
import ProductBig from './ProductBig'

function Header() {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.userReducer.currentUser)

    const cartItems = useSelector(state => state.shoppingCartReducer.shoppingCart)

    const [state, setState] = useState(()=> ({
        shoppingCartDisplay: "none",
        searchResults: [],
        searchContainerDisplay: "none"
    }))

    if (cartItems.length > 0){
        console.log(cartItems[0]._id)
    }

    let cartItemsTotalPrice = 0;
    let totalCartQuantity = 0;

    cartItems.forEach(item => {
        totalCartQuantity+= item.quantity
        cartItemsTotalPrice+= item.quantity * item.price
    })

    const searchOnChange = async (e) => {

        const {value} = e.target
        if (value.length > 0){

            setState(ps => ({
                ...ps,
                searchContainerDisplay: "unset"
            }))
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/shop/product/search/${value}`)
                if (response.status !== 200){
                    throw new Error("There has been an unexpected error, please try again")
                }
    
                const data = await response.json()
    
                setState(ps => ({
                    ...ps,
                    searchResults: data.products
                }))
    
                if (data.products.length > 0){
                    console.log(data.products)
                }
    
                else{
                    console.log("There are no products")
                }
    
    
    
    
            } catch(error){
    
                console.log(error)
    
            }

        }

        else{
            setState(ps => ({
                ...ps,
                searchResults: [],
                searchContainerDisplay: "none"
            }))
        }

    }

    const SignOut = ()=> {
        dispatch(updateUserAction(null))
        localStorage.removeItem("amazonCloneUser")
    }
    return (
        <header className={styles.Header}>

        <div className={styles.example}></div>

        <Link to="/" className={styles.logoContainer}>
            <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
        </Link>

        <div className={styles.searchContainer} >
            <input type="text" name="search" onChange={searchOnChange} />
            <BsSearch />
            <div className={styles.searchResultsContainer} style={{display: state.searchContainerDisplay}}>
                {state.searchResults.length > 0 ? state.searchResults.map(product => (<Link to={`/shop/product/${product._id}`}>{product.name}</Link>)) : <p>There are no products</p>}
            </div>
        </div>

            <div className={styles.subNav}>
            <Link to="/account">
                <p>Hello {currentUser ? currentUser.name : "Stranger"}</p>
                <p1>Account & Lists</p1>
            </Link>

            {currentUser ? (<ul>
                <Link className={styles.navLinks} to="/">Home</Link>
                    <Link className={styles.navLinks} to="/account">Your Account</Link>
                    <Link className={styles.navLinks} to="/favourites">Your Favourites</Link>
                    <Link className={styles.navLinks} to="/orders">Your Orders</Link>
                    <Link className={styles.navLinks} to="/SignIn">Your Prime Membership</Link>
                    <Link className={styles.navLinks} to="/" onClick={SignOut}>Sign Out</Link>   
                </ul>) : <ul>
                    <Link className={styles.navLinks} to="/">Home</Link>
                    <Link className={styles.navLinks} to="/account">Your Account</Link>
                    <Link className={styles.navLinks} to="/favourites">Your Favourites</Link>
                    <Link className={styles.navLinks} to="/orders ">Your Orders</Link>
                    <Link className={styles.navLinks} to="/SignIn">Your Prime Membership</Link>
                    <Link className={styles.navLinks} to="/auth/signin">Sign In</Link>   
                </ul>}
            </div>


            <Link to="/" className={styles.shoppingBagContainer}>
                <img src="/images/shopping-bag.svg" alt="shopping bag"/>
                <p>{totalCartQuantity}</p>

                <div className={styles.cartDropdown} >
                    <div className="cart-items">
                    {cartItems.length ? cartItems.map(cartItem => <CartItemDiv cartItem={cartItem} />) : <p>Your Cart Is Empty</p>}
                    </div>
                    <p>Total Price: £{cartItemsTotalPrice.toFixed(2)}</p>
                    <Link to="/checkout">GO TO CHECKOUT</Link>
                </div>

        </Link>








        </header>
    )
}

export default Header
