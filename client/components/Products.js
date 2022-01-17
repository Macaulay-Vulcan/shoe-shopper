import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import { me } from "../store";

const Products = () => {
	const { auth, products } = useSelector((state) => state);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
		setLoading(false);
	}, []);

	if (loading) return <div>Loading</div>;
	return (
		<div>
			<h3 className="products-title">PRODUCTS IN STOCK</h3>
			{auth.isAdmin && <Link to="/products/create">Create a Product</Link>}
			<div className="products-container">
				{products.map((prod) => (
					<div key={prod.id} className="product-tile">
						<img src={prod.image} />
						<h3>{prod.name}</h3>
						<p>{prod.brand}</p>
						<p className="price">{`$${prod.unit_price}`}</p>
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
