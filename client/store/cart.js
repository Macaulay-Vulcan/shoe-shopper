import axios from 'axios';
const TOKEN = 'token';

const SET_CART = 'SET_CART';
const setCart = (cart) => ({ type: SET_CART, cart });

export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: cart } = await axios.get(`/api/order`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCart(cart));
      } catch (error) {
        console.log(error);
      }
    };
  }
};

export const addToCart = (size, color, quantity) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const added = await axios.post(
          `api/order`,
          {
            headers: {
              authorization: token,
            },
          },
          {
            size: size,
            color: color,
            quantity,
          },
        );
        if (added) {
          ('Your item has been added');
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
};

export default function CartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
