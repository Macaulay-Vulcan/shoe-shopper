import axios from "axios";
import history from "../history";

//// ACTION TYPES ////

const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";

//// ACTION CREATORS ////

const setProducts = (products) => ({
	type: SET_PRODUCTS,
	products,
});

const _createProduct = (product) => ({
	type: CREATE_PRODUCT,
	product,
});

//// THUNK CREATORS ////

export const fetchProducts = () => {
	return async (dispatch) => {
		try {
			const { data: products } = await axios.get("/api/products");
			dispatch(setProducts(products));
		} catch (error) {
			console.log(error);
		}
	};
};

export const createProduct = (product) => {
	return async (dispatch) => {
		try {
			const { data: newProduct } = await axios.post("/api/products", product);
			dispatch(_createProduct(newProduct));
			history.push("/products");
		} catch (error) {
			console.error("🧑🏻‍💻 Error while creating product in thunk!");
		}
	};
};

//// SUB-REDUCER ////

export default function (state = [], action) {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		case CREATE_PRODUCT:
			return [...state, action.product];
		default:
			return state;
	}
};
