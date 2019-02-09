import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import './CardProduct.scss'

class CardProduct extends Component{
    render() {
        return(
            <>
                <NavLink to={`/product/1`} className="product-item">
                    <img src="../../img/featured.png" alt="" className="product-img"/>
                    <p className="product-name">No-Iron Easy Care Sleeveless Shirt</p>
                    <p className="product-price">$599.00</p>
                </NavLink>
            </>
        )
    }
}

export default CardProduct;