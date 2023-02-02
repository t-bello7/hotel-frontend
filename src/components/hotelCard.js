import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';
import defaultHotel from "../assets/images/default-hotel.jpg";
import { usePutHotelMutation, useDeleteHotelMutation } from '../services/hotel';
import "../assets/styles/hotelCard.css";
import '../assets/styles/hotels.css';

const HotelCard = (props) => {
  const [putHotel, { isLoading, error }] = usePutHotelMutation();
  const [deleteHotelReq, { isLoading: deleteLoading }] = useDeleteHotelMutation();
  const { hotel } = props;

  const visibile = "reserve_btn text_1";
  const [popup, setPopup] = useState("popup_window");
  const [deletepopup, setdeletePopup] = useState("popup_window");

  const [hotelData, setHotelData] = useState({
    name: hotel.name,
    location: hotel.location,
    email: hotel.email,
    phone_number: hotel.phone_number
  });

  const editHotel = () => {
    setPopup("popup_window display");
  };

  const deleteHotel = () => {
    setdeletePopup("popup_window display");
  };

  const handleHotelFormChange = (event) => {
    setHotelData({
      ...hotelData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      putHotel(hotel.id, hotelData);
      toast.success("Succefully Updated hotel");
      setPopup("popup_window");
    } catch (err) {
      toast.error(error);
    }
  };
  const link = `/hotels/${hotel.id}`;
  return (
    <div>
      <div className="card">
        <NavLink to={link}>
          <div className="card_img_holder">
            <img className="card_img" src={hotel.image_url || defaultHotel} alt="" />
          </div>
        </NavLink>
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
          </div>
          <div>
            <button type="button" className={visibile} onClick={editHotel}>Edit Hotel</button>
            <button type="button" className={visibile} onClick={deleteHotel}>Delete Hotel</button>
          </div>
        </div>
      </div>

      {/* ----------------------------------- */}
      {/* ----------- Edit Hotel form Popup window  */}
      <div className={popup}>
        <div className="add_new_hotel_box">
          <div className="add_new_hotel_header">
            <h2 className="white_color">Edit Hotel</h2>
            <button type="button" onClick={() => setPopup("popup_window")} className="close_btn">
              <i className="fa fa-times white_color" />
            </button>
          </div>
          {isLoading && <Loader />}
          <form className="add_new_hotel_form" method="post" onSubmit={handleSubmit}>
            <input type="text" name="name" className="form_feild" placeholder="Hotel Name" onChange={handleHotelFormChange} value={hotelData?.name} required />
            <input type="text" name="location" className="form_feild" placeholder="Location" onChange={handleHotelFormChange} value={hotelData?.location} required />
            <input type="email" name="email" className="form_feild" placeholder="Email" onChange={handleHotelFormChange} value={hotelData?.email} required />
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleHotelFormChange} value={hotelData?.phone_number} required />
            <button type="submit" className="reserve_btn text_1">Update</button>
          </form>
          {/* ------------------------------------- */}
          <ToastContainer />
        </div>
      </div>
      {/* </NavLink> */}

      {/* ----------------------------------- */}
      {/* ----------- Delete Hotel form Popup window  */}
      <div className={deletepopup}>
        <div className="add_new_hotel_box">
          <div className="add_new_hotel_header">
            <h2 className="white_color">Delete Hotel</h2>
            <button type="button" onClick={() => setdeletePopup("popup_window")} className="close_btn">
              <i className="fa fa-times white_color" />
            </button>
          </div>
          <div>
            <p>Would You Like to delete This Hotel</p>
            {deleteLoading && <Loader />}
            <button type="submit" className="reserve_btn text_1" onClick={() => setdeletePopup("popup_window")}>Cancel</button>
            <button type="submit" className="reserve_btn text_1" onClick={() => deleteHotelReq(hotel.id)}>Delete</button>
          </div>
          {/* ------------------------------------- */}
          <ToastContainer />
        </div>
      </div>
      {/* </NavLink> */}
    </div>
  );
};

HotelCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hotel: PropTypes.object.isRequired
};
export default HotelCard;
