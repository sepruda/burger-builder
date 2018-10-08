import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        }
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    componentDidMount() {
        console.log(this.props);

        this.parseQueryParams();
    }

    parseQueryParams() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for (let params of query.entries()) {
            ingredients[params[0]] = +params[1];

            // if (this.state.title !== param[1]) {
            //     this.setState({ title: param[1] });
            // }
        }
        this.setState({ ingredients: ingredients });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        );
    }
}

export default Checkout;
