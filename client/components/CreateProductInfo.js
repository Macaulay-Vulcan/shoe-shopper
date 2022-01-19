import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProductInfos, updateProductInfo } from "../store/productInfos";
import { fetchSingleProduct } from "../store/singleProduct";

const CreateProductInfo = () => {
	const dispatch = useDispatch();
	const { productId } = useParams();
	const { product, productInfos } = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
    dispatch(setProductInfos(productId))
	}, []);

	if (!productInfos)
		return (
			<div className="cart-container">No sizes & colors are available!</div>
		);
  console.log('🧑🏻‍💻 productInfos', productInfos);
	return (
		<div className="cart-container">
			<h3>
				{product.name}, by {product.brand}
			</h3>
			<table>
				<thead>
					<tr>
						<th>Color</th>
						<th>Size</th>
						<th>Stock</th>
					</tr>
				</thead>
				<tbody>
					{productInfos
						.sort((a, b) => a.color.localeCompare(b.color))
						.sort((a, b) => {
							if (a.color === b.color) return a.size - b.size;
							else return 0;
						})
						.map((item) => (
							<tr key={item.id} className="cart-item">
								<td>{item.color}</td>
								<td>{item.size}</td>
								{/* <td>{item.stock}</td> */}
								<td>
									<button
										type="button"
										className="cart-quantity-button"
										onClick={() =>
											dispatch(updateProductInfo({...item, stock: item.stock - 1}))
										}
									>
										-
									</button>
									{item.stock}
									<button
										type="button"
										className="cart-quantity-button"
										onClick={() =>
											dispatch(updateProductInfo({...item, stock: item.stock + 1}))
										}
									>
										+
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default CreateProductInfo;
