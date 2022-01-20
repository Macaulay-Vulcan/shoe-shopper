import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	setProductInfos,
	updateProductInfo,
	deleteProductInfo,
	createProductInfo,
} from "../store/productInfos";
import { fetchSingleProduct } from "../store/singleProduct";

const CreateProductInfo = () => {
	const dispatch = useDispatch();
	const { productId } = useParams();
	const { product, productInfos } = useSelector((state) => state);

	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const [stock, setStock] = useState(1);

	const [errors, setErrors] = useState({
		color: "init",
		size: "init",
		stock: "",
	});

	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
		dispatch(setProductInfos(productId));
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		switch (name) {
			case "color":
				setColor(value);
				break;
			case "size":
				setSize(value);
				break;
			case "stock":
				setStock(value);
				break;
			default:
				break;
		}
		let errorsUpdate = Object.assign(errors);
		errorsUpdate[name] = value.length < 1 ? `${name} is empty!` : "";
		setErrors(errorsUpdate);
	};

	const handleCreate = (e) => {
		e.preventDefault();
		if (Object.values(errors).every((error) => error === "")) {
			const productInfo = {
				color,
				size,
				stock,
        productId,
			};
			dispatch(createProductInfo(productInfo));
			setColor("");
			setSize("");
			setStock(1);
		} else {
			console.error("Invalid Form");
		}
	};

	const isEmpty = (input) => {
		return input.length > 0 && input !== "init";
	};

	if (!productInfos)
		return (
			<div className="cart-container">No sizes & colors are available!</div>
		);
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
						<th>Remove</th>
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
											dispatch(
												updateProductInfo({ ...item, stock: item.stock - 1 })
											)
										}
									>
										-
									</button>
									{item.stock}
									<button
										type="button"
										className="cart-quantity-button"
										onClick={() =>
											dispatch(
												updateProductInfo({ ...item, stock: item.stock + 1 })
											)
										}
									>
										+
									</button>
								</td>
								<td>
									<small
										className="cart-remove-option"
										onClick={() => dispatch(deleteProductInfo(item.id))}
									>
										remove
									</small>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<form onSubmit={handleCreate}>
				<label htmlFor="color">Color:</label>
				<input name="color" onChange={handleChange} value={color} />
				{isEmpty(errors.color) && <span className="error">{errors.color}</span>}
				<label htmlFor="size">Size:</label>
				<input name="size" onChange={handleChange} value={size} />
				{isEmpty(errors.size) && <span className="error">{errors.size}</span>}
				<label htmlFor="stock">Stock:</label>
				<input
					name="stock"
					onChange={handleChange}
					value={stock}
					type="number"
					min="1"
					step="any"
				/>{" "}
				{isEmpty(errors.stock) && <span className="error">{errors.stock}</span>}
				<button
					type="submit"
					disabled={!Object.values(errors).every((error) => error === "")}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateProductInfo;
