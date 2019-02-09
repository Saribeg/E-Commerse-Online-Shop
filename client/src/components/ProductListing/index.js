import React, {Component} from 'react'
import CardProduct from "../CardProduct";
import './ProductListing.scss'


class ProductListing extends Component{
    render() {
        let listProduct = [];
        for(let i=0; i<this.props.items; i++){
            listProduct.push(<CardProduct/>)
        }
        return(
            <div className="listing-products">
                {listProduct}
            </div>

        )
    }
}

export default ProductListing;