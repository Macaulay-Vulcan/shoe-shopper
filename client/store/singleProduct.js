import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

const setSingleProduct = product => ({ type: SET_SINGLE_PRODUCT, product });

export const fetchSingleProduct = (productId) => {
    return async (dispatch) => {
        try {
            // const { data: product } = await axios.get(`/api/products/${productId}`);
            const product = {id: 1, description: 'item 1', price: 105, imageUrl: ''};
            dispatch(setSingleProduct(product));        
        } catch (error) {
            console.log(error);
        }
    }
}


export default function singleProductReducer (state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_PRODUCT:
            return action.product;
        default:
            return state;
    }
}