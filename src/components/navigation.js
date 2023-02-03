/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { selectUserToken } from '../features/auth/authSlice';
import { clearAuthState } from '../hooks/localstorage';

const Navigation = () => {
  const token = useSelector(selectUserToken);
  const { username } = jwt(token);
  const navigate = useNavigate();
  const activeStyle = ({ isActive }) => ({
    backgroundColor: isActive ? 'var(--color-accent)' : 'white',
    color: isActive ? 'white' : '#2b2b2b',
  });

  const handleLogout = () => {
    clearAuthState();
    navigate('/');
  };

  return (
    <div className="navigation">
      <div className="text_center">
        <p>
          {' '}
          Welcome ,
          <span>{username}</span>
          {' '}
          to
          {' '}
        </p>
        <a href="/" className="logo">Hotel Booking</a>
      </div>
      <div className="nav_holder">
        <nav className="navbar">
          <NavLink className="nav_link" style={activeStyle} to="/hotels">Hotels</NavLink>
          <NavLink className="nav_link" style={activeStyle} to="/bookings">Bookings</NavLink>
          <button className="nav_link nav_link-btn" type="button" onClick={handleLogout}> Logout </button>
        </nav>
      </div>
      <div className="text_center">
        <div className="social_link_holder">
          <a href="http://twitter.com">
            <i className="fa fa-twitter social_link" aria-hidden="true" />
          </a>
          <a href="http://facebook.com">
            <i className="fa fa-facebook social_link" aria-hidden="true" />
          </a>
          <a href="http://googleplus.com">
            <i className="fa fa-google-plus social_link" aria-hidden="true" />
          </a>
          <a href="http://vimeo.com">
            <i className="fa fa-vimeo social_link" aria-hidden="true" />
          </a>
          <a href="http://pinterest.com">
            <i className="fa fa-pinterest-p social_link" aria-hidden="true" />
          </a>
        </div>
        <p className="copyright_text">&copy; 2023 Hotel Booking and rating</p>
      </div>
    </div>
  );
};

export default Navigation;
