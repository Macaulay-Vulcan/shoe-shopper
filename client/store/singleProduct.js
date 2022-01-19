import axios from 'axios';
import history from '../history';
const TOKEN = 'token';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

const EDIT_SINGLE_PRODUCT = 'EDIT_SINGLE_PRODUCT';

const setSingleProduct = (product) => ({
  type: SET_SINGLE_PRODUCT,
  product,
});

const _editSingleProduct = (updatedProduct) => ({
  type: EDIT_SINGLE_PRODUCT,
  updatedProduct,
});
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

export const editSingleProduct = (product) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: updatedProduct } = await axios.put(
          `/api/products/${product.id}`,
          product,
          {
            headers: {
              authorization: token,
            },
          },
        );
        dispatch(_editSingleProduct(updatedProduct));
        history.push('/products');
      } catch (error) {
        console.log(error);
      }
    };
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    case EDIT_SINGLE_PRODUCT:
      return action.updatedProduct;
    default:
      return state;
  }
};
