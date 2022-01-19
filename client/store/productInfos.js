import axios from "axios";

const TOKEN = "token";

//// ACTION TYPES ////

const SET_PRODUCT_INFOS = "SET_PRODUCT_INFOS";
const UPDATE_PRODUCT_INFO = "UPDATE_PRODUCT_INFO";

//// ACTION CREATORS ////

const _setProductInfos = (productInfos) => ({
	type: SET_PRODUCT_INFOS,
	productInfos,
});

const _updateProductInfo = (productInfo) => ({
	type: UPDATE_PRODUCT_INFO,
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
		default:
			return state;
	}
}
