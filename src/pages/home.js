import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/button';
import "../assets/styles/home.css";
import background from "../assets/images/home-hotel.jpg";
import HomeLayout from '../layouts/homeLayout';

export default Home = () => (
  <HomeLayout background={background}>
    <div className="btn--container">
      <NavLink to="/register">
        <Button title="Signup" />
      </NavLink>
      <NavLink to="/login">
        <Button title="Login" />
      </NavLink>
    </div>
  </HomeLayout>
);
