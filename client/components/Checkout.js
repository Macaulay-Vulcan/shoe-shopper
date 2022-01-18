import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';

const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [formInfo, setFormInfo] = useState({
        'cc-number': '',
        'cc-name': '',
        'cc-exp-date': '',
        'cc-security-code': '',
        'cc-zip': '',
        'shipping-address': ''
    });
    const cartTotal = !cart.orderInfos
                ? 0 
                : cart.orderInfos.reduce((acc, item) => acc + item.quantity * item.productInfo.product.unit_price, 0);
    
    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    const handleChange = (e) => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='checkout-container'>
            <h4>Your total is: {cartTotal}</h4>
            <h4>Enter your information to complete order</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cc-number">
                    <small>Credit card number</small>
                </label>
                <input 
                    name="cc-number"
                    type="text"
                    value={formInfo['cc-number']}
                    onChange={handleChange}
                />

                <label htmlFor="cc-name">
                    <small>Name on credit card</small>
                </label>
                <input 
                    name="cc-name" 
                    type="text" 
                    value={formInfo['cc-name']}
                    onChange={handleChange}
                />

                <label htmlFor="cc-exp-date">
                    <small>Expiration date</small>
                </label>
                <input 
                    name="cc-exp-date"
                    type="text"
                    value={formInfo['cc-exp-date']}
                    onChange={handleChange}
                />

                <label htmlFor="cc-security-code">
                    <small>Security code</small>
                </label>
                <input
                    name="cc-security-code"
                    type="text"
                    value={formInfo['cc-security-code']}
                    onChange={handleChange}
                />

                <label htmlFor="cc-zip">
                    <small>Billing zip code</small>
                </label>
                <input 
                    name="cc-zip" 
                    type="text"
                    value={formInfo['cc-zip']}
                    onChange={handleChange} 
                />

                <label htmlFor="shipping-address">
                    <small>Shipping address</small>
                </label>
                <input 
                    name="shipping-address"
                    type="text"
                    value={formInfo['shipping-address']}
                    onChange={handleChange}
                />

                <button type='submit'>Confirm Order</button>
            </form>
            <button type='button'>Back to Cart</button>
        </div>
    )
}

export default Checkout;