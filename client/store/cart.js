import axios from 'axios';
const TOKEN = 'token';

const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

const setCart = (cart) => ({ type: SET_CART, cart });
const addToCart = (cartItem) => ({ type: ADD_TO_CART, cartItem });

export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: cart } = await axios.get('/api/order', {
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

export const addItemToCart = (productInfoId) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: cartItem } = await axios.post('/api/order', {productInfoId}, 
        {
          headers: {
            authorization: token
          }
        });
        dispatch(addToCart(cartItem));
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
    case ADD_TO_CART:
      return { ...state, orderInfos: [...state.orderInfos, action.cartItem]};
    default:
      return state;
  }
}
