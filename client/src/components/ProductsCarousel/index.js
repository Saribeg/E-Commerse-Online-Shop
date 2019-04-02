import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./products-carousel.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";

class ProductsCarousel extends Component {
  state = {
    dbCarousel: []
  };

  componentDidMount() {
    axios.get(`/carousel`).then(res => {
      this.setState({ dbCarousel: res.data });
    });
  }

  render() {
    let itemsCarousel = this.state.dbCarousel.map(item => {
      return (
        <div id={item.desc} key={item._id} className="carousel-item">
          <img src={item.imageUrl} alt="product" />
          <div className="price">${item.product.previousPrice}</div>
          <div className="stock-price">${item.product.currentPrice}</div>
          <div className="info">{item.product.model}</div>
          <NavLink
            key={item.product._id}
            to={item.product.productUrl}
            className="carousel-btn"
            onClick={() => (this.setState.dbCarousel = [])}
          >
            Show more
          </NavLink>
        </div>
      );
    });

    return (
      <>
        {itemsCarousel.length < 1 ? null : (
          <Carousel
            className="products-carousel"
            // autoPlay={true}
            interval={5000}
            transitionTime={700}
            stopOnHover={true}
            showIndicators={false}
            infiniteLoop={true}
            showStatus={false}
            useKeyboardArrows={true}
          >
            {itemsCarousel}
          </Carousel>
        )}
      </>
    );
  }
}

export default ProductsCarousel;
