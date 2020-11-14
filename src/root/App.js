import './App.css';
import Dashboard from '../pages/dashboard';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Component } from 'react';
import {getAccessToken} from "../actions/root";
import CartPage from "../pages/cart";
import Order from "../pages/order";
import OrderSuccess from "../components/order-success";



class App extends Component {
    componentDidMount() {
        const { getAccessToken } = this.props;
        getAccessToken();
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/cart">
                        <CartPage />
                    </Route>
                    <Route path="/order">
                        <Order />
                    </Route>
                    <Route path="/order-success">
                        <OrderSuccess />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/dashboard" />
                    </Route>
                </Router>
            </div>
        );
    }
}

const mapDispatchToProps = { getAccessToken }

export default connect(null, mapDispatchToProps)(App);
