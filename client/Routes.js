import React, {Component, Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
import Account from './components/Account'
import {me} from './store'

const Routes = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me())
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/account" component={Account} />
        </Switch>
      ) : (
        <Switch>
          <Route path='/' exact component={() => Login} />
          <Route path="/login" component={() => Login} />
          <Route path="/signup" component={() => Signup} />
        </Switch>
      )}
      <Route exact path="/products" component={Products} />
      <Route path="/products/:productId" component={SingleProduct} />
    </div>
  )
}

export default Routes;
