import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../store/products";
import { me } from "../store";
import { centsToDollars } from "../utility";

const Products = () => {
	const { auth, products } = useSelector((state) => state);
	const [loading, setLoading] = useState(true);
	const username = useSelector((state) => state.auth.username);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
		setLoading(false);
	}, []);

	function handleDelete(e, productId) {
		e.preventDefault();
		dispatch(deleteProduct(productId));
	}

	if (loading)
		return (
			<div>
				<h3 className="products-title">Loading</h3>
			</div>
		);
	return (
		<div>
			<div>
				{auth.isAdmin && (
					<Link to="/products/create" className="create-product-link">
						Create a New Product
					</Link>
				)}
				<div className="products-title">
					{username ? (
						<h3>Welcome back {username}!</h3>
					) : (
						<h3>Welcome to Shoe Shopper!</h3>
					)}
				</div>
			</div>
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
								<div>
									<Link
										to={`/products/edit/${prod.id}`}
										className="edit-product-link"
									>
										<small>Edit this product!</small>
									</Link>
								</div>
							)}
							{auth.isAdmin && (
								<div>
									<a
										className="edit-product-link"
										type="button"
										onClick={(e) => handleDelete(e, prod.id)}
									>
										<small>Delete this product!</small>
									</a>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
