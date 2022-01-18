import React, { Component, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Account from "./components/Account";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import Cart from "./components/Cart";
import { me } from "./store";

const Routes = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.id);
	const { userId, isAdmin } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(me());
	}, []);

	return (
		<div className="content">
      <Route exact path="/" component={Home} />
			{isLoggedIn ? (
				<Switch>
					<Route path="/account" component={Account} />
          {isAdmin &&
          <div>
            <Route exact path="/users" component={Users} />
            <Route path="/users/:userId" component={SingleUser} />
          </div>}
				</Switch>
			) : (
				<Switch>
					<Route exact path="/login" component={() => Login} />
					<Route path="/signup" component={() => Signup} />
				</Switch>
			)}
			<Route exact path="/products" component={Products} />
			<Route path="/products/:productId" component={SingleProduct} />
			<Route path="/order" component={() => <Cart userId={userId} />} />
		</div>
	);
};

export default Routes;
