import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { addToCart } from '../store/cart';

const SingleProduct = () => {
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    setLoading(false);
  }, []);

  function handleAddToCartButton() {
    dispatch(addToCart());
  }

  if (loading) return <div>Loading</div>; // errors out if product is not loaded yet!
  return (
    <div>
      <div>
        <h2> {product.name}</h2>
        <img src={product.image} />
        <h3>Brand: {product.brand}</h3>
        <h4>Type: {product.type}</h4>
        <h4>
          Sizes:
          {product.size}
        </h4>{' '}
        {/* how to display all sizes? */}
        <h4>Price: {'$' + (product.unit_price / 100).toFixed(2)}</h4>
        <h4>Description: </h4>
        <p>{product.description}</p>
        <button type="button" onClick={handleAddToCartButton}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
