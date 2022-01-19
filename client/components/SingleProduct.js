import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItemToCart } from "../store/cart";

const SingleProduct = () => {
	const { productId } = useParams();
	const { auth, product } = useSelector((state) => state);
	const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(0);

	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		const productInfoId = e.target.productId.value;
		if (productInfoId) {
			dispatch(addItemToCart(productInfoId));
      setAddedToCart(addedToCart + 1);
		}
	}

	if (!product.id)
		return <div className="single-product-container">Loading</div>;
	return (
		<div className="single-product-container">
			<div className="single-product-left">
				<h2> {product.name}</h2>
				<img src={product.image} />
				<h4 className="price">{"$" + (product.unit_price / 100).toFixed(2)}</h4>
			</div>
			<div className="single-product-right">
				<h4>{product.brand}</h4>
				<h4>Category: {product.type}</h4>
				<p>{product.description}</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="size-color">Select available size and color:</label>
					<select id="size-color" name="productId">
						<option hidden="hidden">Size / Color</option>
						{product.productInfos
							.filter((prod) => prod.stock > 0)
							.sort((a, b) => Number(a.size) - Number(b.size))
							.map((prod) => (
								<option key={prod.id} value={prod.id}>
									{`Size: ${prod.size} / Color: ${prod.color}`}
								</option>
							))}
					</select>
					{auth.isAdmin && (
						<Link to={`/products/${product.id}/create`}>
							Edit Sizes & Colors
						</Link>
					)}
					<button type="submit">Add To Cart</button>
          <p>
              <small
                className={addedToCart ? 'add-to-cart-confirmation' : ''}
              >
                You added {addedToCart} items to cart.
              </small>
            </p>
				</form>
			</div>
		</div>
	);
};

export default SingleProduct;
