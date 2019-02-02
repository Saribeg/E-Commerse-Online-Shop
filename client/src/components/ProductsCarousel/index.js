import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './ProductsCarousel.scss'

class ProductsCarousel extends Component {
    render() {
        return (
            <Carousel
                className="products-carousel"
                autoPlay={true}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                useKeyboardArrows={true}
                centerMode={true}
                centerSlidePercentage={30}
                transitionTime={500}
            >
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/pyjzt1iyrmbows3wemei/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-jordan-spizike-dPT0g8VG.jpg"/>
                    <p className="legend">Legend 111</p>
                </div>
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/fejqk5m5hvlwqimazdvp/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-air-jordan-future-r6nZ3G.jpg"/>
                    <p className="legend">Legend 222</p>
                </div>
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/ygohbixmtvwvepwrypgd/air-jordan-1-high-zip-womens-shoe-ZKbQWb.jpg"/>
                    <p className="legend">Legend 333</p>
                </div>
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/ide7mjcmuielcweokovt/jordan-88-racer-mens-running-shoe-0nVJ63.jpg"/>
                    <p className="legend">Legend 444</p>
                </div>
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/ygohbixmtvwvepwrypgd/air-jordan-1-high-zip-womens-shoe-ZKbQWb.jpg"/>
                    <p className="legend">Legend 555</p>
                </div>
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/o9qxaero8qhmovd9k8zc/air-jordan-future-shoe-Jjb0jn.jpg"/>
                    <p className="legend">Legend 777</p>
                </div>
                <div className='carousel-item'>
                    <img
                        src="https://c.static-nike.com/a/images/t_default/vngwowgvidzfsdvqwbds/jordan-flyknit-elevation-23-mens-shoe-qpg1lz.jpg"/>
                    <p className="legend">Legend 888</p>
                </div>

            </Carousel>
        );
    }
}

export default ProductsCarousel;