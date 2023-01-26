import React from 'react';
import Login from '../pages/Login';
// import rooms from './roomList.json';
import './home.css';

export default function Home() {
  return (
    <div className="content_holder home">
      <div>
        <h1 className="white_color">BOOK YOUR HOTEL NOW</h1>
        <p className="white_color text_center">Register and start booking with several clicks</p>
      </div>
      <div className="login_form_holder">
        <Login />
      </div>
    </div>
  );
}
