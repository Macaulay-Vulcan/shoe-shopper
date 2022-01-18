import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';

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
          {cart.orderInfos.map((item) => {
            cartTotal +=
              item.quantity * item.productInfo.product.unit_price;
            return (
              <tr key={item.id} className='cart-item'>
                <td>{item.productInfo.product.name}</td>
                <td>
                  <button type='button'>-</button>
                  {item.quantity}
                  <button type='button'>+</button>
                </td>
                <td><small>remove</small></td>
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
      <button type='button'>Update Cart</button>
      <button type='button'>Checkout</button>
    </div>
  );
};

export default Cart;
