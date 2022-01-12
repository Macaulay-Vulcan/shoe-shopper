import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

const setSingleProduct = product => ({ type: SET_SINGLE_PRODUCT, product });

export const fetchSingleProduct = (productId) => {
    return async (dispatch) => {
        try {
            // const { data: product } = await axios.get(`/api/products/${productId}`);
            const product = {
              description: 'description...',
              type: 'type',
              brand: 'brand',
              image: 'https://www.ariadellcorta.com/wp-content/uploads/2017/04/Photo-Image-Coming-Soon-Icon-1.jpg',
              color: 'color',
              sizes: ['1', '2', '3'],
              price: '12345', // in cents
            };
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
