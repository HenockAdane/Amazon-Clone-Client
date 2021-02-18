import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../SCSScomponents/ProductSmall.module.scss"

function ProductSmall(props) {
    return (
        <Link to={props.to} className={styles.Product}>
            <img src={props.frontImg} alt="Product" />
            <p>{props.name}</p>
            <p>Reviews: {props.reviewsLength}</p>
            <p>£{props.price.toFixed(2)}</p>
            <p>{props.price > 0 && props.price < 50 ? 30 : props.price >= 50 && props.price < 100 ? 20 : props.price >= 100 && props.price < 200 ? 10 : 5 } % off and free delivery with prime</p>

        </Link>
    )
}

export default ProductSmall
