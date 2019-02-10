import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './ProductsCarousel.scss'

class ProductsCarousel extends Component {
    state = {
        items: [
            {
                id: 'someId',
                imgLink : 'https://c.static-nike.com/a/images/t_default/pyjzt1iyrmbows3wemei/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-jordan-spizike-dPT0g8VG.jpg',
                price: '$100.00',
                promotional: '$79.99',
                desc: 'Legend111'
            },
            {
                id: 'someId',
                imgLink : 'https://c.static-nike.com/a/images/t_default/fejqk5m5hvlwqimazdvp/%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%BE%D0%B2%D0%BA%D0%B8-air-jordan-future-r6nZ3G.jpg',
                price: '$200.00',
                promotional: '$179.99',
                desc: 'Legend222'
            },
            {
                id: 'someId',
                imgLink : 'https://c.static-nike.com/a/images/t_default/ygohbixmtvwvepwrypgd/air-jordan-1-high-zip-womens-shoe-ZKbQWb.jpg',
                price: '$300.00',
                promotional: '$279.99',
                desc: 'Legend333'
            },
            {
                id: 'someId',
                imgLink : 'https://c.static-nike.com/a/images/t_default/ide7mjcmuielcweokovt/jordan-88-racer-mens-running-shoe-0nVJ63.jpg',
                price: '$400.00',
                promotional: '$379.99',
                desc: 'Legend333'
            },
            {
                imgLink : 'https://c.static-nike.com/a/images/t_default/ygohbixmtvwvepwrypgd/air-jordan-1-high-zip-womens-shoe-ZKbQWb.jpg',
                price: '$500.00',
                promotional: '$479.99',
                desc: 'Legend444'
            },
            {
                id: 'someId',
                imgLink : 'https://c.static-nike.com/a/images/t_default/o9qxaero8qhmovd9k8zc/air-jordan-future-shoe-Jjb0jn.jpg',
                price: '$200.00',
                promotional: '$159.99',
                desc: 'Legend555'
            },
            {
                id: 'someId',
                imgLink : 'https://c.static-nike.com/a/images/t_default/vngwowgvidzfsdvqwbds/jordan-flyknit-elevation-23-mens-shoe-qpg1lz.jpg',
                price: '$500.00',
                promotional: '$459.99',
                desc: 'Legend666'
            },
            {
                id: 'someId',
                imgLink: 'https://c.static-nike.com/a/images/t_default/o9qxaero8qhmovd9k8zc/air-jordan-future-shoe-Jjb0jn.jpg',
                price: '$100.00',
                promotional: '$79.99',
                desc: 'Legend777'
            },
            {
                id: 'someId',
                imgLink: 'https://c.static-nike.com/a/images/t_default/vngwowgvidzfsdvqwbds/jordan-flyknit-elevation-23-mens-shoe-qpg1lz.jpg',
                price: '$900.00',
                promotional: '$799.99',
                desc: 'Legend888'
            },
        ]
    };
    render() {

        let itemsCarousel = this.state.items.map(item => {
            return (
                <div id={item.desc} className='carousel-item'>
                    <img src={item.imgLink} alt='product'/>
                    <p className="legend">{item.desc}</p>
                    <div className='price'>{item.price}</div>
                </div>
            )
        });

        return (
            <Carousel
                className="products-carousel"
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                useKeyboardArrows={true}
                transitionTime={500}
            >
                {itemsCarousel}
            </Carousel>
        );
    }
}

export default ProductsCarousel;