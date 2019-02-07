import React, {Component} from 'react'
import CardProduct from "../CardProduct";


class ProductListing extends Component{
    render() {
        return(
            <div className="listing-products">
                <CardProduct/>
            </div>

        )
    }
}

export default ProductListing;