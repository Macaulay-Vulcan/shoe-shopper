import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUser';

const SingleUser = () => {
  const { userId } = useParams();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // const userInfoId = e.target.userId.value;
    // if (userInfoId) {
    //   dispatch(addItemToCart(userInfoId));
    // }
  }

  if (!user) return <div className='single-user-container'>Loading</div>;
  return (
    <div className='single-user-container'>
      <div className='single-user-left'>
        <h2>Username: {user.username}</h2>
        <p>User ID: {user.id}</p>
      </div>
      <div className='single-user-right'>
        <h4>Category: {user.type}</h4>
        <p>{user.description}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='size-color'>Select available size and color:</label>
          <button type="submit">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUser;
