import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id);
  const { isAdmin } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='header'>
      <h1>Shoe-Shopper</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/products">Products</Link>
            <Link to="/account">Account</Link>
            {isAdmin && <Link to="/users">Users</Link>}
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/order">Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/products">Products</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/order">Cart</Link>
          </div>
        )}
      </nav>
    </div>
)}

export default Navbar;
