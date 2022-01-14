import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart'

const Cart = (props) => {
    const userId = props.userId;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    let cartTotal = 0;

    useEffect(() => {
        if (userId) dispatch(fetchCart(userId));
    }, []);
    
    if (!cart.orderInfos) return (<div>Loading...</div>);
    return (
        <div>
            {
            cart.orderInfos.map(item => {
                cartTotal += item.quantity * item.productInfo.product.unit_price;
                return (
                    <div key={item.id}>
                        <p>Name: {item.productInfo.product.name}</p>
                        <p>QTY: {item.quantity}</p>
                        <p>Size: {item.productInfo.size}</p>
                        <p>Color: {item.productInfo.color}</p>
                        <p>Price: {item.productInfo.product.unit_price}</p>
                    </div>
            )})
            }
            <div>
                <p>Cart Total: {cartTotal}</p>
            </div>
        </div>
    )
}

export default Cart;