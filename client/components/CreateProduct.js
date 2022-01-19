import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../store/products";
import { dollarsToCents } from "../utility"

const CreateProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [brand, setBrand] = useState("");
	const [image, setImage] = useState("");
	const [unit_price, setUnitPrice] = useState(0);
	const [errors, setErrors] = useState({
		name: "init",
		description: "init",
		type: "init",
		brand: "init",
		unit_price: "init",
	});

	console.log(typeof unit_price, unit_price)

	const types = ["basketball", "runner", "boot", "lifestyle", "other"];

  const dispatch = useDispatch();

  const { isAdmin } = useSelector(state => state.auth);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		switch (name) {
			case "name":
				setName(value);
				break;
			case "description":
				setDescription(value);
				break;
			case "type":
				setType(value);
				break;
			case "brand":
				setBrand(value);
				break;
			case "image":
				setImage(value);
				break;
			case "unit_price":
				setUnitPrice(value);
				break;
			default:
				break;
		}
		let errorsUpdate = Object.assign(errors);
		errorsUpdate[name] = value.length < 1 ? `${name} is empty!` : "";
		setErrors(errorsUpdate);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.values(errors).every((error) => error === "")) {
			const unitPriceCents = dollarsToCents(unit_price);
			const product = { name, description, type, brand, image, unit_price: unitPriceCents };
			dispatch(createProduct(product));
		} else {
			console.error("Invalid Form");
		}
	};

	const isEmpty = (input) => {
		return input.length > 0 && input !== "init";
	};

  if (!isAdmin) return <div>You must be an admin user!</div>
	return (
		<div>
			<h2>Create New Product</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input name="name" onChange={handleChange} value={name} />
				{isEmpty(errors.name) && <span className="error">{errors.name}</span>}
				<label htmlFor="description">Description:</label>
				<input name="description" onChange={handleChange} value={description} />
				{isEmpty(errors.description) && (
					<span className="error">{errors.description}</span>
				)}
				<label htmlFor="type">Type:</label>
				<select name="type" onChange={handleChange} value={type}>
					<option hidden="hidden">Choose Type</option>
					{types.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
				<label htmlFor="brand">Brand:</label>
				<input name="brand" onChange={handleChange} value={brand} />
				{isEmpty(errors.brand) && <span className="error">{errors.brand}</span>}
				<label htmlFor="image">Image Link:</label>
				<input name="image" onChange={handleChange} value={image} type="url" />
				<label htmlFor="unit_price">Price:</label>
				<input
					name="unit_price"
					onChange={handleChange}
					value={unit_price}
					type="number"
					min="0"
					step="any"
				/>{" "}
				{/* decide unit_price limit */}
				{isEmpty(errors.unit_price) && <span className="error">{errors.unit_price}</span>}
				<button
					type="submit"
					disabled={!Object.values(errors).every((error) => error === "")}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CreateProduct;
