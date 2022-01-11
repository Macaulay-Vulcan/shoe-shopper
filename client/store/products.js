import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = products => ({ type: SET_PRODUCTS, products });

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            // const { data: products } = await axios.get('/api/products');
            const products = [{id: 1, description: 'item 1', price: 105, imageUrl: ''}]
            dispatch(setProducts(products));        
        } catch (error) {
            console.log(error);
        }
    }
}


export default function productsReducer (state = [], action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}