import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import { me } from '../store';
import { centsToDollars } from '../utility';

const Products = () => {
  const { auth, products } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div>
        <h3 className="products-title">Loading</h3>
      </div>
    );
  return (
    <div>
      <h3 className="products-title">PRODUCTS IN STOCK</h3>
      {auth.isAdmin && (
        <Link to="/products/create">Create a New Product</Link>
      )}
      <div className="products-container">
        {products.map((prod) => (
          <div key={prod.id} className="product-tile">
            <img src={prod.image} />
            <h3>{prod.name}</h3>
            <p>{prod.brand}</p>
            <p className="price">{centsToDollars(prod.unit_price)}</p>
            <Link to={`/products/${prod.id}`}>
              <p>
                <button>See Details</button>
              </p>
            </Link>
            <div>
              {auth.isAdmin && (
                <Link to={`/products/edit/${prod.id}`}>
                  Edit this product!
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
