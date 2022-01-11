import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleProduct } from '../store/singleProduct'

const SingleProduct = () => {
    const { productId } = useParams();
    const product = useSelector(state => state.product)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleProduct(productId))
    }, [])

    return (
        <div>
            <img src={product.imageUrl} />
            <h3>{product.description}</h3>
            <h4>{`$${product.price}`}</h4>
            <button 
                type="button"
                >
                Add To Cart
            </button>
        </div>
    )
}

export default SingleProduct;