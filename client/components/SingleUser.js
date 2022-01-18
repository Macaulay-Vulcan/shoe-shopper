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
    <div>
      <h2>Username: {user.username}</h2>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Phone: {user.phone}</p>
      <p>Birthday: {user.birthday}</p>
    </div>
  );
};

export default SingleUser;
