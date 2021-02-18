import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addItemToCartAction} from "../ReduxReducers/shoppingCartReducer"
import { Link } from 'react-router-dom'
import styles from "../SCSScomponents/Orders.module.scss"

function Orders() {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const orders = currentUser.orders

    const refundOne = async () => {
        try{

        } catch(error){
            console.log(error)
        }
    }

    const refundAll = async (order) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/payment/refundAll`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userID: currentUser._id, intentID: order.payment.intent})
            })

            if (response.status !== 200){
                throw new Error("There has been a problem with refundAll")
            }

            const data = await response.json()
            console.log(data)

        } catch(error){
            console.log(error)
        }
    }

    return (
        <div>

            {orders.length > 0 ? orders.map(order => (
                <div className={styles.order}>
                <button onClick={() => refundAll(order)}>REFUND ALL</button>
                    <div className={styles.intro}>
                        <div>
                            <p>ORDER PLACED</p>
                            <p>{order.datePlaced}</p>
                        </div>

                        <div>
                            <p>TOTAL</p>
                            <p>{order.totalPrice.toFixed(2)}</p>
                        </div>
                        
                    </div>


                        {order.products.map(product => (
                            <div className={styles.main}>
                                <img src={product.images[0]} alt="Product" />
                                <div className={styles.mainIntro}>
                                    <Link className={styles.name} to={`/shop/product/${product._id}`}>{product.name}</Link>
                                    <button className={styles.addToBasketBtn} onClick={()=>dispatch(addItemToCartAction(product))}>
                                        <div className={styles.logoContainers}>
                                        <img style={{width: "25px"}} src="/images/shopping-bag.svg" alt="shopping bag"/> 
                                        </div><p>Add To Basket</p>
                                    </button>
                                    <button onClick={refundOne}>REFUND findOne</button>
                                    <Link className={styles.viewProductBtn} to={`/shop/product/${product._id}`}>View Product</Link>
                                </div>
                            </div>
                        ))}
                        

                </div>
            )): <h1>YOU HAVE NO ORDERS</h1>}
            
        </div>
    )
}

export default Orders
