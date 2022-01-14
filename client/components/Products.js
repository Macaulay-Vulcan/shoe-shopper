import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';

const Products = () => {
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    setLoading(false);
  }, []);

  if (loading) return <div>Loading</div>;
  return (
    <div>
      <h1>PRODUCTS IN STOCK : </h1>
      {products.map((prod) => (
        <div key={prod.id}>
          <h2>
            <Link to={`/products/${prod.id}`}>{prod.name}</Link>
          </h2>
          <h3>{prod.brand}</h3>
          <img src={prod.image} />
          <h3>{prod.description}</h3>
          <h4>{`$${prod.unit_price}`}</h4>
        </div>
      ))}
    </div>
  );
};

export default Products;
