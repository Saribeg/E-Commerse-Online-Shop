import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import ProductsCarousel from './components/ProductsCarousel'
import TopBlockAuth from './components/TopBlockAuth'


class App extends Component {
    render() {
        return (
            <div className="App">

                <TopBlockAuth/>
                <ProductsCarousel/>

            </div>
        );
    }
}

export default App;
