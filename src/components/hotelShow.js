import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import { useGetHotelQuery, useGetRoomsQuery, usePostRoomMutation } from '../services/hotel';
import RoomCard from './roomCard';
import Loader from './Loader';
import '../assets/styles/hotelShow.css';
import { selectUserToken } from '../features/auth/authSlice';

const HotelShow = () => {
  const token = useSelector(selectUserToken);
  const { hotelId } = useParams();
  const { data: hotel, error, isLoading } = useGetHotelQuery(hotelId);
  const { data: rooms, error: roomsError, isLoading: roomsIsLoading } = useGetRoomsQuery(hotelId);
  const [postRoom, { isLoading: roomisLoading, roomError }] = usePostRoomMutation();
  const [roomData, setRoomData] = useState({
    name: '',
    hotel_id: hotelId,
    room_type: '',
    bed_count: 0,
    price: 0,
  });
  const [popup, setPopup] = useState("popup_window ");
  const [navstatus, setNavstatus] = useState("mob_nav");
  const [image, setImage] = useState({
    imagePreview: "",
    pictureAsFile: "",
  });

  const mobMenuAction = () => {
    if (navstatus === "mob_nav") setNavstatus("mob_nav mob_nav_opened");
    else {
      setNavstatus("mob_nav");
    }
  };

  const display = () => {
    setPopup("popup_window display");
  };

  const uploadPicture = (e) => {
    setImage({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0]
    });
  };

  const activeStyle = ({ isActive }) => ({
    color: isActive ? 'white' : '#2b2b2b',
  });

  const handleRoomFormChange = (event) => {
    setRoomData({
      ...roomData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const getFormData = (object) => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
      const credentials = getFormData(roomData);

      if (image.pictureAsFile) {
        credentials.append(
          "image",
          image.pictureAsFile
        );
      }
      const { user_id: userId } = jwt(token);

      postRoom({ userId, hotelId, credentials });
      toast.success("Succesfully added Room");
    } catch (err) {
      toast.error(roomError);
    }
  };

  return (
    <div className="hotel_show">
      <div className="hotel_content_panel">
        {error && <div> Error Loading Data </div>}
        {isLoading && <Loader />}
        <div className="image_holder">
          <img src={hotel?.image_url} alt="hotel_image" className="banner_image" />
        </div>
        <div className="hotel_show_holder_header">
          <button type="button" className="reserve_btn text_1" onClick={display}>Add New Room</button>
          <button type="button" className="mob_menu_btn" onClick={mobMenuAction}>
            <i className="fa fa-bars green_color" />
          </button>
        </div>
        <div className="mobile_hotel_info">
          <h1 className="mob_h_name">{hotel?.name}</h1>
          <div>
            <p>
              <i className="fa fa-phone green_color" aria-hidden="true" />
              &nbsp;&nbsp;
              {hotel?.phone_number}
            </p>
            <p>
              <i className="fa fa-envelope green_color" aria-hidden="true" />
              &nbsp;&nbsp;
              {hotel?.email}
            </p>
            <p>
              <i className="fa fa-map-marker green_color" aria-hidden="true" />
              &nbsp;&nbsp;
              {hotel?.location}
            </p>
          </div>
        </div>
        <div className="rooms_panel">
          {roomsError && <div> Error Loading Data </div>}
          {roomsIsLoading && <Loader />}
          {
            rooms?.map((room) => <RoomCard key={room.id} room={room} />)
          }
        </div>
        <div className="footer">
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
      </div>
      <div className="hotel_info_panel">
        <div className="info_holder">
          <h1>{hotel?.name}</h1>
          <p>
            <i className="fa fa-phone green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            {hotel?.phone_number}
          </p>
          <p>
            <i className="fa fa-envelope green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            {hotel?.email}
          </p>
          <p>
            <i className="fa fa-map-marker green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            {hotel?.location}
          </p>
        </div>
      </div>
      <div className={popup}>
        <div className="add_new_hotel_box">
          <div className="add_new_hotel_header bg_purple">
            <h2 className="white_color">Add New Room</h2>
            <button type="button" onClick={() => setPopup("popup_window")} className="close_btn">
              <i className="fa fa-times white_color" />
            </button>
          </div>
          <form className="add_new_hotel_form" method="post" onSubmit={handleSubmit}>
            {roomisLoading && <Loader />}
            <input type="text" name="name" className="form_feild" onChange={handleRoomFormChange} value={roomData?.name} placeholder="Room Name" required />
            <input type="number" name="bed_count" className="form_feild" onChange={handleRoomFormChange} value={roomData?.beds} placeholder="Beds" min={1} required />
            <select name="room_type" id="room_type" className="form_field" onChange={handleRoomFormChange}>
              <option value="">-- Please choose a Room Type --</option>
              <option value="single-room"> Single Room </option>
              <option value="couple-room"> Couple Room </option>
              <option value="conference-hall"> Conference Hall </option>
            </select>
            <input type="number" name="price" className="form_feild" onChange={handleRoomFormChange} placeholder="Price" min={1} required />
            <label htmlFor="image-hotel">
              Select Room Image
              <input type="file" id="image-hotel" name="image" onChange={uploadPicture} />
            </label>
            {
              image.imagePreview && <img src={image.imagePreview} alt="preview" />
              }
            <button type="submit" className="reserve_btn text_1">Add</button>
            <ToastContainer />
          </form>
          {/* ------------------------------------- */}
        </div>
      </div>
      <div className={navstatus}>
        <button type="button" className="mob_menu_btn" onClick={mobMenuAction}>
          <i className="fa fa-times white_color" />
        </button>
        <br />
        <br />
        <h1 className="text_1 text_center">Hotel Booking</h1>
        <br />
        <br />
        <div className="mob_nav_holder text_center">
          <nav className="navbar">
            <NavLink className="nav_link" style={activeStyle} to="/hotels">Hotels</NavLink>
            <NavLink className="nav_link" style={activeStyle} to="/bookings">Bookings</NavLink>
            <a className="nav_link" href="/">Logout</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HotelShow;
