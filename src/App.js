import React, { Component, Suspense } from "react";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import LogOut from "./containers/Auth/Logout/LogOut";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";
const AsyncCheckout = React.lazy(() =>
  import("./containers/Checkout/Checkout")
);
const AsyncOrders = React.lazy(() => import("./containers/Orders/Orders"));
const AsyncAuth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <AsyncAuth />
            </Suspense>
          )}
        />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <AsyncCheckout />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <AsyncOrders />
              </Suspense>
            )}
          />
          <Route path="/logout" component={LogOut} />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <AsyncAuth />
              </Suspense>
            )}
          />
          <Route exact path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
