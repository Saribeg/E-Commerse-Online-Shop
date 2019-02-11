import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faQuestion} from '@fortawesome/free-solid-svg-icons'
// import TopBlockAuth from './components/TopBlockAuth'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
// import ProductPage from "./components/ProductPage";

import './scss/style.scss';

library.add(faQuestion)

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/profile" component={Profile}/>
                    {/*<Route exact path="/product/1" component={ProductPage}/>*/}
                </Switch>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
