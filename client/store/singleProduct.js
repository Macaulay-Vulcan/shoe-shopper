import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

const setSingleProduct = (product) => ({ type: SET_SINGLE_PRODUCT, product });

export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(
        `/api/products/${productId}`,
      );
      dispatch(setSingleProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
