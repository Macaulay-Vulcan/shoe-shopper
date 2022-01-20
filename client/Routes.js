import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';
import SingleProduct from './components/SingleProduct';
import CreateProductInfo from './components/CreateProductInfo';
import Account from './components/Account';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import EditProduct from './components/EditProduct';
import { me } from './store';

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
        <Route exact path="/" component={Products} />
        {isLoggedIn && (
          <Route exact path="/account" component={Account} />
        )}
        {isAdmin && <Route exact path="/users" component={Users} />}
        {isAdmin && (
          <Route exact path="/users/:userId" component={SingleUser} />
        )}
        {!isLoggedIn && (
          <Route exact path="/login" component={() => Login} />
        )}
        {!isLoggedIn && (
          <Route exact path="/signup" component={() => Signup} />
        )}
        <Route exact path="/products" component={Products} />
        <Route
          exact
          path="/products/create"
          component={CreateProduct}
        />
        {isAdmin && (
          <Route
            exact
            path="/products/edit/:productId"
            component={EditProduct}
          />
        )}
        <Route
          exact
          path="/products/:productId"
          component={SingleProduct}
        />
        <Route
          exact
          path="/products/:productId/create"
          component={CreateProductInfo}
        />
        <Route
          exact
          path="/order"
          component={() => <Cart userId={userId} />}
        />
        <Route exact path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
