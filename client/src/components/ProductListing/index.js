import React, {Component} from "react";
import {connect} from "react-redux";
import {getProductItem, saveProductDetails} from "../../actions/product";
import {NavLink} from "react-router-dom";
import "./ProductListing.scss";


class ProductListing extends Component {
    componentDidMount() {
        this.props.getProductItem();
    }

    render() {

        let counterItems = 0;

        let listProduct = this.props.productListing.map(productItem => {

            return productItem.productFeatures.map(item => {
                counterItems++;

                if (counterItems <= this.props.children)
                return (
                   
                        <NavLink key={item._id} to={productItem.productUrl} className="product-item" onClick={()=> this.props.saveProductDetails(item.colorName)}>
                       
                            <img src={item.imageUrls[0]} alt={productItem.model} className="product-img" />
                            <p className="product-name">{productItem.model} ({item.colorName})</p>
                            <p className="product-price">${productItem.currentPrice}</p>
                      
                        </NavLink>
                   
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

const mapDispatchToProps = (dispatch) => {
	return {
        getProductItem: () => dispatch(getProductItem())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
