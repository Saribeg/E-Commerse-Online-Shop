import React, { Component } from 'react';
import ProductsCarousel from '../ProductsCarousel';
import Subscribe from '../Subscribe';
import ProductListing from "../ProductListing";
import EmptyState from "../EmptyState";

import './MainPage.scss'
class MainPage extends Component {
    render () {

        return (
            <div>
                <ProductsCarousel />

                <section className="section-listing-products">
                    <div className="container">
                        <div className="listing">
                            <h2 className="listing-title">Featured</h2>
                            <ProductListing children={8}/>
                        </div>
                    </div>
                </section>
                <Subscribe/>
                <EmptyState title="Oops"/>

            </div>
        )

    }
}

export default MainPage;