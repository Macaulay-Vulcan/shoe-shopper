import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchSingleProduct,
  editSingleProduct,
} from '../store/singleProduct';

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [unit_price, setUnitPrice] = useState(0);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    type: '',
    brand: '',
    unit_price: '',
  });
  const types = [
    'basketball',
    'runner',
    'boot',
    'lifestyle',
    'other',
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'brand':
        setBrand(value);
        break;
      case 'image':
        setImage(value);
        break;
      case 'unit_price':
        setUnitPrice(value);
        break;
      default:
        break;
    }
    let errorsUpdate = Object.assign(errors);
    errorsUpdate[name] = value.length < 1 ? `${name} is empty!` : '';
    setErrors(errorsUpdate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => error === '')) {
      const product = {
        id: productId,
        name,
        description,
        type,
        brand,
        image,
        unit_price,
      };
      dispatch(editSingleProduct(product));
    } else {
      console.error();
    }
  };

  const isEmpty = (input) => {
    return input.length > 0 && input !== 'init';
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setType(product.type);
    setBrand(product.brand);
    setImage(product.image);
    setUnitPrice(product.unit_price);
  }, [product]);

  if (!product) {
    return <div>PRODUCT DOESN'T EXIST!</div>;
  }

  return (
    <div>
      <h2>Fill out form to edit Product :</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          onChange={handleChange}
          value={name || ''}
        />
        {isEmpty(errors.name) && (
          <span className="error">{errors.name}</span>
        )}
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          onChange={handleChange}
          value={description || ''}
        />
        {isEmpty(errors.description) && (
          <span className="error">{errors.description}</span>
        )}
        <label htmlFor="type">Type:</label>
        <select
          name="type"
          onChange={handleChange}
          value={type || ''}
        >
          <option hidden="hidden">Choose Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <label htmlFor="brand">Brand:</label>
        <input
          name="brand"
          onChange={handleChange}
          value={brand || ''}
        />
        {isEmpty(errors.brand) && (
          <span className="error">{errors.brand}</span>
        )}
        <label htmlFor="image">Image Link:</label>
        <input
          name="image"
          onChange={handleChange}
          value={image || ''}
          type="url"
        />
        <label htmlFor="unit_price">Price:</label>
        <input
          name="unit_price"
          onChange={handleChange}
          value={unit_price || ''}
          type="number"
          min="0"
          max="1000"
        />{' '}
        {/* decide unit_price limit */}
        {isEmpty(errors.unit_price) && (
          <span className="error">{errors.unit_price}</span>
        )}
        <button
          type="submit"
          disabled={
            !Object.values(errors).every((error) => error === '')
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
