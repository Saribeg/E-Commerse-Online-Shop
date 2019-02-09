import React, { Component } from 'react';
import ProductsCarousel from '../ProductsCarousel';
import ProductListing from "../ProductListing";
import EmptyState from "../EmptyState";

class MainPage extends Component {
    render () {

        return (
            <div>
                <ProductsCarousel />

                <section className="section-listing-products">
                    <div className="container">
                        <div className="listing">
                            <h2 className="listing-title">Featured</h2>
                            <ProductListing items={8}/>
                        </div>
                    </div>
                </section>
                <EmptyState title="Oops"/>

            </div>
        )

    }
}

export default MainPage