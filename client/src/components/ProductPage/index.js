import React, {Component} from 'react'

class ProductPage extends Component {
    render() {
        return (
            <>
                <section className="product-main container">

                    <div className="all-photos">

                        <img className="all-photos-item active"
                             src="https://vignette.wikia.nocookie.net/leagueoflegends/images/7/79/Janna_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203244"
                             alt="pants"/>
                        <img className="all-photos-item"
                             src="https://vignette.wikia.nocookie.net/leagueoflegends/images/7/79/Janna_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203244"
                             alt="pants"/>
                        <img className="all-photos-item"
                             src="https://vignette.wikia.nocookie.net/leagueoflegends/images/7/79/Janna_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203244"
                             alt="pants"/>
                        <img className="all-photos-item"
                             src="https://vignette.wikia.nocookie.net/leagueoflegends/images/7/79/Janna_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203244"
                             alt="pants"/>
                        <img className="all-photos-item"
                             src="https://vignette.wikia.nocookie.net/leagueoflegends/images/7/79/Janna_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414203244"
                             alt="pants"/>
                    </div>

                    <div className="photo-main">

                        <img src="http://www.hotel-r.net/im/hotel/gr/katarina-10.png" alt="pants"/>
                    </div>

                    <form action="#" className="product-main-info">
                        <h2 className="product-title">Drape Neck Dress.</h2>
                        <span className="product-meta">Item No. 25697212</span>
                        <p className="product-price">SGD 139.90 </p>
                        <p className="product-filter">Color</p>
                        <ul className="product-colors">
                            <li className="color-item red active"/>
                        </ul>
                        <p className="product-filter">Size</p>
                        <ul className="product-sizes">
                            <li className="size-item">1</li>
                            <li className="size-item active">2</li>
                            <li className="size-item">3</li>
                            <li className="size-item">4</li>
                        </ul>
                        <p className="product-filter">Quantity</p>
                        <div className="product-counter">
                            <button className="product-counter-btn">-</button>
                            <span className="product-counter-value">0</span>
                            <button className="product-counter-btn">+</button>
                        </div>

                        <button type="submit" className="btn-add-to-cart">Add to cart</button>
                    </form>
                </section>
            </>
        )

    }
}

export default ProductPage;