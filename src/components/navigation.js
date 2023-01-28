/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  // eslint-disable-next-line arrow-body-style
  const activeStyle = ({ isActive }) => {
    return ({
      backgroundColor: isActive ? 'var(--color-accent)' : 'white',
      color: isActive ? 'white' : '#2b2b2b',
    });
  };
  return (
    <div className="navigation">
      <div className="text_center">
        <a href="/" className="logo">Hotel Booking</a>
      </div>
      <div className="nav_holder">
        <nav className="navbar">
          <NavLink className="nav_link" style={activeStyle} to="/hotels">Hotels</NavLink>
          <NavLink className="nav_link" style={activeStyle} to="/booking">Bookings</NavLink>
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
}
