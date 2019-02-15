import React, {Component} from "react";
import {connect} from "react-redux";
import {getProductItem} from "../../actions/product";
import {NavLink} from "react-router-dom";
import "./ProductListing.scss";


class ProductListing extends Component {
    componentDidMount() {
        this.props.getProductItem();
    }

    render() {
        let listProduct = this.props.productListing.map(item => {

            return item.productFeatures.map(item2 => {
                return (
                    <>
                        <NavLink key={item2._id} to={item.productUrl} className="product-item">
                            {/*<img src={item2.imageUrls[0]} alt={item.model} className="product-img" />*/}
                            <img src="../../img/featured.png" alt={item.model} className="product-img"/>
                            <p className="product-name">{item.model}</p>
                            <p className="product-price">${item.currentPrice}</p>
                        </NavLink>

                    </>
                )
            })
        })

        return (
            <div className="listing-products">
                {this.props.isProductListing ? <div>Загрузка товаров...</div> : listProduct}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productListing: state.product.productListing,
        isProductListing: state.product.isProductListing
    }
}

export default connect(mapStateToProps, {getProductItem})(ProductListing);


// let listProduct = this.props.productListing.map(item => {
//     let listProd = item.productFeatures.map(item2 => {
//         return (
//             <>
//                 <p className="product-name">{item2.colorName}</p>
//                 <p className="product-price">{item.currentPrice}</p>
//
//                 {/*<img src={item2.imageUrls} alt="" className="product-img" />*/}
//             </>
//         )
//     })
//     return (
//
//         <NavLink key={item._id} to={item.productUrl} className="product-item">
//             <img src="../../img/featured.png" alt={item.model} className="product-img"/>
//             {listProd}
//             {/*<p className="product-name">{item.model}</p>*/}
//             {/*<p className="product-price">{item.currentPrice}</p>*/}
//         </NavLink>
//
//     )
//
// })