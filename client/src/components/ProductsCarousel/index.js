import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './ProductsCarousel.scss'

class ProductsCarousel extends Component {
    state = {
        items: [
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/pyjzt1iyrmbows3wemei/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-jordan-spizike-dPT0g8VG.jpg',
                desc: 'Legend111'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/fejqk5m5hvlwqimazdvp/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-air-jordan-future-r6nZ3G.jpg',
                desc: 'Legend222'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/ygohbixmtvwvepwrypgd/air-jordan-1-high-zip-womens-shoe-ZKbQWb.jpg',
                desc: 'Legend333'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/ide7mjcmuielcweokovt/jordan-88-racer-mens-running-shoe-0nVJ63.jpg',
                desc: 'Legend333'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/ygohbixmtvwvepwrypgd/air-jordan-1-high-zip-womens-shoe-ZKbQWb.jpg',
                desc: 'Legend444'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/o9qxaero8qhmovd9k8zc/air-jordan-future-shoe-Jjb0jn.jpg',
                desc: 'Legend555'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/vngwowgvidzfsdvqwbds/jordan-flyknit-elevation-23-mens-shoe-qpg1lz.jpg',
                desc: 'Legend666'
            },
            {
                imgLink: 'https://c.static-nike.com/a/images/t_default/o9qxaero8qhmovd9k8zc/air-jordan-future-shoe-Jjb0jn.jpg',
                desc: 'Legend777'
            },
            {
                imgLink: 'https://c.static-nike.com/a/images/t_default/vngwowgvidzfsdvqwbds/jordan-flyknit-elevation-23-mens-shoe-qpg1lz.jpg',
                desc: 'Legend888'
            },
        ]
    };
    render() {

        let itemsCarousel = this.state.items.map(item => {
            return (
                <div key={item.desc} className='carousel-item'>
                    <img src={item.imgLink}/>
                    <p className="legend">{item.desc}</p>
                </div>
            )
        });

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
                {itemsCarousel}
            </Carousel>
        );
    }
}

export default ProductsCarousel;