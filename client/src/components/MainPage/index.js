import React, { Component } from 'react'

import ProductsCarousel from '../ProductsCarousel'
import ProductListing from "../ProductListing";

class MainPage extends Component {
    render () {

        return (
            <div>
                <ProductsCarousel />

                <section className="section-listing-products">
                    <div className="container">
                        <div className="listing">
                            <h2 className="listing-title">Featured</h2>
                            <ProductListing/>
                        </div>
                    </div>
                </section>
            </div>
        )

    }
}

export default MainPage