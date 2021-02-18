import React, { useState, useEffect } from 'react'
import {useParams, Redirect } from "react-router-dom"
import ProductSmall from './ProductSmall'
import styles from "../SCSScomponents/ShopCategory.module.scss"

function ShopCategory() {

    const [state, setState] = useState(()=> ({
        loading: true,
        products: []
    }))
    const {category} = useParams()

    // if (category !== "books" || category !== "kitchen"){
    //     <Redirect to="/" />
    // }
    

    useEffect(() => {
        console.log(category)

        fetch(`${process.env.REACT_APP_API}api/shop/category/${category}`).then(res => {
            if (res.status === 200){
                return res.json()
            }

            else{
                console.log("theres an error")
            }
        }).then(data => {
            console.log(data)

            setState(ps => ({
                ...ps,
                loading: false,
                products: data
            }))
        })
    }, [])


    return (
        <div>

        {/* {category !== "books" ? (<Redirect to="/" />) : category !== "kitchen" ? (<Redirect to="/" />) : false} */}
        {state.products ? state.products.map(product => (
            <ProductSmall
            to={`/shop/product/${product._id}`}
            frontImg={product.images[0]}
            name={product.name}
            reviewsLength={product.reviews.length}
            price={product.price}
            />


        )): false}
            
        </div>
    )
}

export default ShopCategory
