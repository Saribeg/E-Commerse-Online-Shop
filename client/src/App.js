import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import ProductsCarousel from './components/ProductsCarousel'


class App extends Component {
  render() {
    return (
      <div className="App">

        <ProductsCarousel/>
      </div>
    );
  }
}

export default App;
