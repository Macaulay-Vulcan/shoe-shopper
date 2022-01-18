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

  if (loading) return <div><h3 className="products-title">Loading</h3></div>;
  return (
    <div>
      <h3 className="products-title">PRODUCTS IN STOCK</h3>
      <div className="products-container">
        {products.map((prod) => (
          <div key={prod.id} className="product-tile">
            <img src={prod.image} />
            <h3>{prod.name}</h3>
            <p>{prod.brand}</p>
            <p className="price">{`$${(prod.unit_price / 100).toFixed(2)}`}</p>
            <Link to={`/products/${prod.id}`}>
              <p>
                <button>See Details</button>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
