import React, { useState } from 'react';
import jwt from 'jwt-decode';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
<<<<<<< HEAD
import { useClearRoomMutation, usePostBookingMutation, useUpdateRoomMutation } from '../services/hotel';
=======
import { usePostBookingMutation, usePutRoomMutation } from '../services/hotel';
>>>>>>> 7d2e372 (- add redux delete action to hotels page)
import { selectUserToken } from '../features/auth/authSlice';
import Loader from './Loader';
import defaultHotel from "../assets/images/default-hotel.jpg";
import '../assets/styles/roomCard.css';

const RoomCard = (props) => {
  const navigate = useNavigate();
  const { room } = props;
  const { hotelId } = useParams();
  const [display, setDisplay] = useState(false);
  const [popup, setPopup] = useState("popup_window ");
  const [deletepopup, setdeletePopup] = useState("popup_window");
  const token = useSelector(selectUserToken);
  const [postBooking, { isLoading: bookingisLoading, bookingError }] = usePostBookingMutation();
  const [updateRoom, { isLoading: roomisLoading, roomError }] = useUpdateRoomMutation();
  const [clearRoom, { isLoading, error }] = useClearRoomMutation();

  const [roomData, setRoomData] = useState({
    name: room.name,
    hotel_id: hotelId,
    type: room.type,
    bed_count: room.bed_count,
    price: room.price,
  });

  const [bookingData, setBookingData] = useState({
    days: 0,
    booking_date: '',
    amount: 0,
    hotel_id: hotelId,
    room_id: room.id,
  });
  const visibile = (room.reserved) ? "reserve_btn text_1 disable" : "reserve_btn text_1";
  const popupClass = display ? "popup_window display" : "popup_window";

  const reserving = () => {
    setDisplay(true);
  };

  const openPopup = () => {
    setPopup("popup_window display");
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

  const handleRoomFormChange = (event) => {
    setRoomData({
      ...roomData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    try {
      const userId = jwt(token).user_id;
      postBooking({ userId, credentials: bookingData });
      updateRoom({
        hotelId, userId, roomId: room.id, credentials: { reserved: true }
      });
      toast.success("Succesfully added Booking");
      navigate('/bookings');
    } catch (err) {
      toast.error(bookingError);
    }
  };
<<<<<<< HEAD

  const handleRoomUpdateSubmit = () => {
    try {
      updateRoom(room.id, roomData);
      toast.success("Succesfully Updated Room");
    } catch (err) {
      toast.error(roomError);
    }
  };

  const deleteHotel = () => {
    setdeletePopup("popup_window display");
  };

  const handledeleteSubmit = (event) => {
    event.preventDefault();
    try {
      clearRoom(room.id);
      toast.success("Succefully Deleted room");
      setdeletePopup("popup_window");
    } catch (err) {
      toast.error(error);
    }
  };

=======
>>>>>>> 7d2e372 (- add redux delete action to hotels page)
  return (
    <div className="room_card">
      <div className="room_image_holder">
        <img src={room.image_url || defaultHotel} alt="room_image" className="room_image" />
      </div>
      <div className="room_info_holder">
        <div className="d_flex space_between">
          <h2 className="text_1">{room.room_type}</h2>
          <h2 className="text_1">
            <i className="fa fa-money green_color" />
            Price: $
            {room.price}
          </h2>
        </div>
        <div className="d_flex space_between">
          <h2 className="text_1">
            <i className="fa fa-bed green_color" aria-hidden="true" />
            Beds:
            {room.bed_count}
          </h2>
          <button type="button" className={visibile} onClick={openPopup}>Edit Room</button>
          <button type="button" className={visibile} onClick={deleteHotel}>Delete Room</button>
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
                {room.name}
              </h1>
              <hr />
              <h3 className="fixed_info">
                <i className="fa fa-tag green_color" />
                Room Type:
                {room.room_type}
              </h3>
              <h3 className="fixed_info">
                <i className="fa fa-bed green_color" />
                Beds:
                {room.bed_count}
              </h3>
              <h3 className="fixed_info">
                <i className="fa fa-money green_color" />
                Price: $
                {room.price}
              </h3>
              <form className="reserve_form" method="get" onSubmit={handleSubmit}>
                {bookingisLoading && <Loader />}
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
                {bookingData.amount}
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className={visibile}>Reserve</button>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={popup}>
        <div className="add_new_hotel_box">
          <div className="add_new_hotel_header bg_purple">
            <h2 className="white_color">Update Room</h2>
            <button type="button" onClick={() => setPopup("popup_window")} className="close_btn">
              <i className="fa fa-times white_color" />
            </button>
          </div>
          {isLoading && <Loader />}
          <form className="add_new_hotel_form" method="post" onSubmit={handleRoomUpdateSubmit}>
            {roomisLoading && <Loader />}
            <input type="text" name="name" className="form_feild" onChange={handleRoomFormChange} value={roomData?.name} placeholder="Room Name" required />
            <input type="text" name="image" className="form_feild" onChange={handleRoomFormChange} value={roomData?.image} placeholder="Image" required />
            <input type="number" name="bed_count" className="form_feild" onChange={handleRoomFormChange} value={roomData?.beds} placeholder="Beds" min={1} required />
            <select name="type" id="type" className="form_field" onChange={handleRoomFormChange}>
              <option value="">-- Please choose a Room Type --</option>
              <option value="single-room"> Single Room </option>
              <option value="couple-room"> Couple Room </option>
              <option value="conference-hall"> Conference Hall </option>
            </select>
            <input type="number" name="price" className="form_feild" onChange={handleRoomFormChange} placeholder="Price" min={1} required />
            <button type="submit" className="reserve_btn text_1">Update</button>
            <ToastContainer />
          </form>
          {/* ------------------------------------- */}
        </div>
      </div>

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
            <button type="submit" className="reserve_btn text_1" onClick={() => setdeletePopup("popup_window")}>Cancel</button>
            <button type="submit" className="reserve_btn text_1" onClick={handledeleteSubmit}>Delete</button>
          </div>
          {/* ------------------------------------- */}
          <ToastContainer />
        </div>
      </div>
      {/* </NavLink> */}
    </div>
  );
};

RoomCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired
};

export default RoomCard;
