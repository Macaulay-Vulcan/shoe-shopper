import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.auth.id);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1>Shoe-Shopper</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/home">Products</Link>
            <Link to="/home">Account</Link>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/home">Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">Home</Link>
            <Link to="/home">Products</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/home">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
)}

export default Navbar;
