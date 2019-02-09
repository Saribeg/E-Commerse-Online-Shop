import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import './scss/style.scss';
// import ProductsCarousel from './components/ProductsCarousel'
// import TopBlockAuth from './components/TopBlockAuth'

import Header from './components/Header'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import Profile from './components/Profile'
import ProductPage from "./components/ProductPage";


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/product/1" component={ProductPage}/>

                </Switch>
                <Footer />
            </Fragment>
        );
    }
}

export default App;
