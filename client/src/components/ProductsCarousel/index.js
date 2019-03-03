import React, {Component} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import "./ProductsCarousel.scss";

class ProductsCarousel extends Component {
    state = {
        items: [
            {
                id: "1",
                imgLink: "https://i.pinimg.com/originals/3d/ac/7f/3dac7f4d0415b98e974658fab12c7db1.jpg",
                price: "$199.00",
                desc: "Perfume Tips Tricks"
            },
            {
                id: "2",
                imgLink: "https://media.sssports.com/content/web/home-page/week04/image-desktop-22.jpg",
                price: "$249.00",
                desc: "Perfume Tips Tricks"
            },
            {
                id: "3",
                imgLink: "http://www.womensfitness.com.au/wp-content/uploads/2016/08/Girlboss-web-pic.jpg",
                price: "$319.00",
                desc: "Perfume Tips Tricks"
            }
        ]
    };

    render() {
        let itemsCarousel = this.state.items.map(item => {
            return (
                <div id={item.desc} key={item.id} className="carousel-item">
                    <img src={item.imgLink} alt="product"/>
                    <div className="price">{item.price}</div>
                    <div className="info">{item.desc}</div>
                    <button className="carousel-btn">Show more</button>
                </div>
            );
        });

        return (
            <Carousel
                className="products-carousel"
                 autoPlay={true}
                transitionTime={700}
                // emulateTouch = {true}
                showIndicators={false}
                infiniteLoop={true}
                showStatus={false}
                useKeyboardArrows={true}
            >
                {itemsCarousel}
            </Carousel>
        );
    }
}

export default ProductsCarousel;
