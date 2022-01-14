import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = (products) => ({ type: SET_PRODUCTS, products });

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      console.log('THIS IS PRODUCTS', products);
      const sampleProducts = [
        {
          id: 1,
          name: 'Sample Shoe',
          description: ' Sample Description',
          type: 'Sample Type',
          brand: 'Sample Brand',
          image: '',
          unit_price: 500,
        },
      ];
      dispatch(setProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
