import axios from "axios";
import history from "../history";

const TOKEN = "token";

//// ACTION TYPES ////

const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

//// ACTION CREATORS ////

const setProducts = (products) => ({
	type: SET_PRODUCTS,
	products,
});

const _createProduct = (product) => ({
	type: CREATE_PRODUCT,
	product,
});

const _deleteProduct = (product) => ({
	type: DELETE_PRODUCT,
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
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: newProduct } = await axios.post(
					"/api/products",
					product,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(_createProduct(newProduct));
				history.push(`/products/${newProduct.id}`);
			} catch (error) {
				console.error("🧑🏻‍💻 Error while creating product in thunk!");
			}
		};
	}
};

export const deleteProduct = (productId) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: deletedProduct } = await axios.delete(
					`/api/products/${productId}`,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(_deleteProduct(deletedProduct));
			} catch (error) {
				console.log(error);
			}
		};
	}
};

//// SUB-REDUCER ////

export default function (state = [], action) {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		case CREATE_PRODUCT:
			return [...state, action.product];
		case DELETE_PRODUCT:
			return state.filter((product) => product.id !== action.product.id);
		default:
			return state;
	}
}
