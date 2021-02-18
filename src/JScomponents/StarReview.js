import React, { useState } from 'react'
import {FaStar} from "react-icons/fa"


function StarReview(props) {


    return (
        <div>
           {[...Array(5)].map((star, i) => <FaStar size={40} style={{color: props.value >= (i+1) ? "#ffc107" : "#e4e5e9" }}/>)}              
        </div>
    )
}

export default StarReview
