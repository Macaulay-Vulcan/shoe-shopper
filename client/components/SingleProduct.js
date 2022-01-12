import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSingleProduct } from '../store/singleProduct'

const SingleProduct = () => {
  const [ loading, setLoading ] = useState(true);
  const { productId } = useParams();
  const product = useSelector(state => state.product)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div> // errors out if product is not loaded yet!
  return (
    <div>
      <h2>Name: ???{product.name}</h2> {/* should we add a product name? how to group Product rows to a single product? */}
      <img src={product.image} />
      <h3>Brand: {product.brand}</h3>
      <h4>Type: {product.type}</h4>
      <h4>Sizes: {product.sizes.toString()}</h4> {/* how to display all sizes? */}
      <h4>Price: {`$${product.price.slice(0, -2)}.${product.price.slice(-2)}`}</h4>
      <h4>Description: {product.description}</h4>
      <button type="button">
        Add To Cart
      </button>
    </div>
  )
}

export default SingleProduct;
