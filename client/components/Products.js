import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/products'

const Products = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <div>
            {
                products.map(prod => (
                    <div key={prod.id}>
                        <Link to={`/products/${prod.id}`}>
                            <img src={prod.imageUrl} />
                            <h3>{prod.description}</h3>
                            <h4>{`$${prod.price}`}</h4>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default Products;