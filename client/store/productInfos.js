import axios from "axios";

const TOKEN = "token";

//// ACTION TYPES ////

const SET_PRODUCT_INFOS = "SET_PRODUCT_INFOS";
const UPDATE_PRODUCT_INFO = "UPDATE_PRODUCT_INFO";
const DELETE_PRODUCT_INFO = "DELETE_PRODUCT_INFO";
const CREATE_PRODUCT_INFO = "CREATE_PRODUCT_INFO";

//// ACTION CREATORS ////

const _setProductInfos = (productInfos) => ({
	type: SET_PRODUCT_INFOS,
	productInfos,
});

const _updateProductInfo = (productInfo) => ({
	type: UPDATE_PRODUCT_INFO,
	productInfo,
});

const _deleteProductInfo = (productInfo) => ({
	type: DELETE_PRODUCT_INFO,
	productInfo,
});

const _createProductInfo = (productInfo) => ({
	type: CREATE_PRODUCT_INFO,
	productInfo,
});

//// THUNK CREATORS ////

export const setProductInfos = (productId) => {
	return async (dispatch) => {
		try {
			const { data: productInfos } = await axios.get(
				`/api/productInfos/product/${productId}`
			);
			dispatch(_setProductInfos(productInfos));
		} catch (error) {
			console.error("🧑🏻‍💻 Error while setting productInfo in thunk!");
		}
	};
};

export const updateProductInfo = (productInfo) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: newProductInfo } = await axios.put(
					`/api/productInfos/${productInfo.id}`,
					{ productInfo },
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(_updateProductInfo(newProductInfo));
			} catch (error) {
				console.error("🧑🏻‍💻 Error while updating productInfo in thunk!");
			}
		};
	}
};

export const deleteProductInfo = (productInfoId) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: deletedProductInfo } = await axios.delete(
					`/api/productInfos/${productInfoId}`,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(_deleteProductInfo(deletedProductInfo));
			} catch (error) {
				console.log(error);
			}
		};
	}
};

export const createProductInfo = (productInfo) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: newProductInfo } = await axios.post(
					"/api/productInfos",
					productInfo,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(_createProductInfo(newProductInfo));
			} catch (error) {
				console.error("🧑🏻‍💻 Error while creating product in thunk!");
			}
		};
	}
};

//// SUB-REDUCER ////

export default function (state = [], action) {
	switch (action.type) {
		case SET_PRODUCT_INFOS:
			return action.productInfos;
		case UPDATE_PRODUCT_INFO:
			return [
				...state.filter((item) => item.id !== action.productInfo.id),
				action.productInfo,
			];
		case DELETE_PRODUCT_INFO:
			return state.filter(
				(productInfo) => productInfo.id !== action.productInfo.id
			);
		case CREATE_PRODUCT_INFO:
			return [...state, action.productInfo];
		default:
			return state;
	}
}
