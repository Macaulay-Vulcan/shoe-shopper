import axios from 'axios';

const SET_CART = 'SET_CART';

const setCart = (cart) => ({ type: SET_CART, cart });

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/order/${userId}`);
      dispatch(setCart(cart));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function CartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
