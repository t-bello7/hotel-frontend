import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import "../assets/styles/hotelCard.css";

export default function HotelCard(props) {
  const { hotel } = props;
  const link = `/hotels/${hotel.id}`;
  return (
    <NavLink to={link}>
      <div className="card">
        <div className="card_img_holder">
          <img className="card_img" src={hotel.image} alt="" />
        </div>
        <div className="card_info">
          <h2 className="card_title">
            <i className="fa fa-building green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            {hotel.name}
          </h2>
          <h3 className="card_email">
            <i className="fa fa-envelope green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            {hotel.email}
          </h3>
          <div className="size_location_holder">
            <h3 className="card_location">
              <i className="fa fa-map-marker green_color" aria-hidden="true" />
              &nbsp;&nbsp;
              {hotel.location}
            </h3>
            <h3 className="card_size">
              Size :
              &nbsp;&nbsp;
              {hotel.size}
            </h3>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

HotelCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hotel: PropTypes.object.isRequired
};
