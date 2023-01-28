import React, { useState } from 'react';
import jwt from 'jwt-decode';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { usePostBookingMutation } from '../services/hotel';
import { selectUserToken } from '../features/auth/authSlice';
import Loader from './Loader';
import '../assets/styles/roomCard.css';

export default RoomCard(props) = () =>{
  const { room } = props;
  const { hotelId } = useParams();
  const [display, setDisplay] = useState(false);
  const token = useSelector(selectUserToken);
  const [postBooking, { isLoading: bookingisLoading, bookingError }] = usePostBookingMutation();
  const [bookingData, setBookingData] = useState({
    days: 0,
    booking_date: '',
    amount: 0,
    hotel_id: hotelId,
    room_id: room.id,
    user_id: jwt(token).user_id
  });
  const visibile = (room.name) ? "reserve_btn text_1" : "reserve_btn text_1 disable";
  const popupClass = display ? "popup_window display" : "popup_window";

  const reserving = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  const handleBookFormChange = (event) => {
    if (event.target.name === 'days') {
      setBookingData({
        ...bookingData,
        [event.target.name]: event.target.value,
        amount: parseInt(event.target.value, 10) * room.price
      });
    } else {
      setBookingData({
        ...bookingData,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = () => {
    try {
      postBooking(bookingData);
      toast.success("Succesfully added Booking");
    } catch (err) {
      toast.error(bookingError);
    }
  };

  return (
    <div className="room_card">
      <div className="room_image_holder">
        <img src={room.image} alt="room_image" className="room_image" />
      </div>
      <div className="room_info_holder">
        <div className="d_flex space_between">
          <h2 className="text_1">{room.name}</h2>
          <h2 className="text_1">
            <i className="fa fa-money green_color" />
            $
            {room.price}
          </h2>
        </div>
        <div className="d_flex space_between">
          <h2 className="text_1">
            <i className="fa fa-bed green_color" aria-hidden="true" />
            {room.beds}
          </h2>
          <button type="button" className={visibile} onClick={reserving}>Book Now</button>
          <div className={popupClass}>
            <div className="reserve_box">
              <div className="popupheader">
                <button type="button" onClick={close} className="close_btn">
                  <i className="fa fa-times" />
                </button>
              </div>
              <h1>
                <i className="fa fa-building green_color" />
                {room.id}
              </h1>
              <hr />
              <h3 className="fixed_info">
                <i className="fa fa-tag green_color" />
                Room Type:
                {room.name}
              </h3>
              <h3 className="fixed_info">
                <i className="fa fa-bed green_color" />
                Beds:
                {room.beds}
              </h3>
              <h3 className="fixed_info">
                <i className="fa fa-money green_color" />
                Price: $
                {room.price}
              </h3>
              <form className="reserve_form" method="get" onSubmit={handleSubmit}>
                { bookingisLoading && <Loader /> }
                <label htmlFor="formDate">
                  From:
                  <input type="date" name="booking_date" onChange={handleBookFormChange} value={bookingData?.booking_date} className="form_field" id="formDate" required />
                </label>
                <br />
                <br />
                <label htmlFor="daysNumber">
                  For:
                  <input type="number" name="days" className="form_field small_field" value={bookingData?.days} onChange={handleBookFormChange} id="daysNumber" min="1" required />
                  Days
                </label>
                Total:  $
                { bookingData.amount }
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="reserve_btn text_1">Reserve</button>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RoomCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired
};
