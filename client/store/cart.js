import axios from 'axios';
const TOKEN = 'token';

const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

const setCart = (cart) => ({ type: SET_CART, cart });
const addToCart = (cartItem) => ({ type: ADD_TO_CART, cartItem });
const removeFromCart = (cartItem) => ({ type: REMOVE_CART_ITEM, cartItem });
const updateItemInCart = (cartItem) => ({ type: UPDATE_CART_ITEM, cartItem });

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
  } else {
    return dispatch => {
      dispatch(setCart({}));
    }
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
  } else {
    return dispatch => {
      dispatch(setCart({}));
    }
  }
};

export const removeCartItem = (orderInfoId) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: cartItem } = await axios.delete(`/api/order/${orderInfoId}`, 
        {
          headers: {
            authorization: token
          }
        });
        dispatch(removeFromCart(cartItem));
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return dispatch => {
      dispatch(setCart({}));
    }
  }
}

export const updateCartItem = (orderInfoId, quantity) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: cartItem } = await axios.put(`/api/order/${orderInfoId}`,
        {quantity}, 
        {
          headers: {
            authorization: token
          }
        });
        dispatch(updateItemInCart(cartItem));
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return dispatch => {
      dispatch(setCart({}));
    }
  }
}

export const confirmOrder = (orderId, orderTotal) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    return async (dispatch) => {
      try {
        const { data: cart } = await axios.put(`/api/checkout/${orderId}`,
        {orderTotal}, 
        {
          headers: {
            authorization: token
          }
        });
        dispatch(setCart({}));
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return dispatch => {
      dispatch(setCart({}));
    }
  }
}

export default function CartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART: {
      if (!state.orderInfos) {
        return { ...state, orderInfos: [action.cartItem] };
      } else {
        return { ...state, orderInfos: [...state.orderInfos, action.cartItem] };
      }
    }
    case REMOVE_CART_ITEM:
      return { ...state, orderInfos: state.orderInfos.filter(item => item.id !== action.cartItem.id)};
    case UPDATE_CART_ITEM:
      return { ...state, orderInfos: [...state.orderInfos.filter(item => item.id !== action.cartItem.id), action.cartItem]};
    default:
      return state;
  }
}
