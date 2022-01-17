import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { addItemToCart } from '../store/cart';

const SingleProduct = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const productInfoId = e.target.productId.value;
    if (productInfoId) {
      dispatch(addItemToCart(productInfoId));
    }
  }

  if (!product.id) return <div>Loading</div>;
  return (
    <div>
      <div>
        <h2> {product.name}</h2>
        <img src={product.image} />
        <h3>Brand: {product.brand}</h3>
        <h4>Type: {product.type}</h4>
        <h4>Description: </h4>
        <p>{product.description}</p>
        <h4>Price: {'$' + (product.unit_price / 100).toFixed(2)}</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor='size-color'>Size and color:</label>
          <select id='size-color' name='productId'>
            <option hidden='hidden'>Select available size and color</option>
            {product.productInfos
              .filter(prod => prod.stock > 0)
              .sort((a, b) => Number(a.size) - Number(b.size))
              .map(prod => (
                <option
                  key={prod.id}
                  value={prod.id}
                >
                  {`Size: ${prod.size} / Color: ${prod.color}`}
                </option>
            ))}
          </select>
          <button type="submit">Add To Cart</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
