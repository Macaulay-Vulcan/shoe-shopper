import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeCartItem, updateCartItem } from '../store/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  let cartTotal = 0;

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  if (!cart.orderInfos) return <div className='cart-container'>Your cart is empty!</div>;
  return (
    <div className='cart-container'>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th></th>
            <th>Size</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.orderInfos
            .sort((a, b) => a.id - b.id)
            .map((item) => {
              cartTotal += item.quantity * item.productInfo.product.unit_price;
            return (
              <tr key={item.id} className='cart-item'>
                <td>
                  <Link to={`/products/${item.productInfo.product.id}`}>
                    {item.productInfo.product.name}
                  </Link>
                </td>
                <td>
                  <button 
                    type='button'
                    className='cart-quantity-button'
                    onClick={() => dispatch(updateCartItem(item.id,item.quantity - 1))}
                  >
                    -
                  </button>
                    {item.quantity}
                  <button 
                    type='button'
                    className='cart-quantity-button'
                    onClick={() => dispatch(updateCartItem(item.id,item.quantity + 1))}
                  >
                    +
                  </button>
                </td>
                <td>
                  <small
                    className='cart-remove-option' 
                    onClick={() => dispatch(removeCartItem(item.id))}
                  >
                    remove
                  </small>
                </td>
                <td>{item.productInfo.size}</td>
                <td>{item.productInfo.color}</td>
                <td>{`$${(item.productInfo.product.unit_price / 100).toFixed(2)}`}</td>
              </tr>
            );
          })}
          <tr className='cart-last-row'>
            <td></td><td></td><td></td><td></td>
            <td>Total:</td>
            <td>{`$${(cartTotal / 100).toFixed(2)}`}</td>
          </tr>
        </tbody>
      </table>
      <div className='cart-checkout-button-container'>
        <Link to={'/checkout'}>
            <button type='button' className='cart-checkout-button'>Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
