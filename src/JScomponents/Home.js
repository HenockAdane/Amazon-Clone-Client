import React from 'react'
import styles from "../SCSScomponents/Home.module.scss"
import {Link} from "react-router-dom"

function Home() {
    return (
        <div className={styles.Home}>

        <div className={styles.productsContainer}>
            <div className={styles.optionsFlex1}>
                <Link className={styles.options} to="/shop/category/books">
                    <img src="/images/homePage/alice-in-the-wonderland.jpg" alt="product type"/>
                    <p>Books</p>
                </Link>
                <Link className={styles.options} to="/shop/category/kitchen">
                    <img src="/images/homePage/baking-mixer.jpg" alt="product type"/>
                    <p>Cooking</p>
                </Link>
            </div>

            <div className={styles.optionsFlex2}>
                <Link className={styles.options}>
                    <img src="/images/homePage/skipping-rope.jpg" alt="product type"/>
                    <p>Fitness</p>
                </Link>
                <Link className={styles.options}>
                    <img src="/images/homePage/ipad.jpg" alt="product type"/>
                    <p>Technology</p>
                </Link>
                <Link className={styles.options}>
                    <img src="/images/homePage/ipad.jpg" alt="product type"/>
                    <p>Technology</p>
                </Link>
            </div>
        </div>
            
        </div>
    )
}

export default Home
