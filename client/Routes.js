import React, { Component, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import SingleProduct from "./components/SingleProduct";
import Account from "./components/Account";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
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
			<Switch>
				<Route exact path="/" component={Home} />
				{isLoggedIn && <Route exact path="/account" component={Account} />}
				{isAdmin && <Route exact path="/users" component={Users} />}
				{isAdmin && <Route exact path="/users/:userId" component={SingleUser} />}
				{!isLoggedIn && <Route exact path="/login" component={() => Login} />}
				{!isLoggedIn && <Route exact path="/signup" component={() => Signup} />}
				<Route exact path="/products" component={Products} />
				{isAdmin && <Route exact path="/products/create" component={CreateProduct} />}
				<Route exact path="/products/:productId" component={SingleProduct} />
				<Route exact path="/order" component={() => <Cart userId={userId} />} />
        <Route path="/checkout" component={Checkout} />
			</Switch>
		</div>
	);
};

export default Routes;
