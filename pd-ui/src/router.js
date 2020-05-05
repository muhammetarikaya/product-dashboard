import React from 'react'
import {Route, Switch} from 'react-router'

import LoginPage from './containers/login/login.page'
import HomePage from './containers/home/home.page'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductPage from "./containers/products/product.page";

export default class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.requireAuth = this.requireAuth.bind(this);
    }

    loggedIn() {
        const {isLoggedIn} = this.props;
        return isLoggedIn;
    }

    requireAuth(nextState, replace) {
        if (!this.loggedIn()) {
            replace({
                pathname: '/login'
            });
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <PrivateRoute exact path="/" component={HomePage}/>
                <PrivateRoute exact path="/home" component={HomePage}/>
                <PrivateRoute exact path="/products" component={ProductPage}/>
            </Switch>
        )
    }
}
