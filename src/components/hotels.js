/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { usePostHotelMutation, useGetHotelsQuery } from '../services/hotel';
import Loader from './Loader';
import HotelCard from './hotelCard';
import '../assets/styles/hotels.css';

const Hotels = () => {
  const { data: hotels, error: hotelError, isLoading: isLoadingHotels } = useGetHotelsQuery();
  const [postHotel, { isLoading, error }] = usePostHotelMutation();
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    email: '',
    phone_number: ''
  });
  const [popup, setPopup] = useState("popup_window");
  const [search, setSearch] = useState("");
  const [navstatus, setNavstatus] = useState("mob_nav");

  const mobMenuAction = () => {
    if (navstatus === "mob_nav") setNavstatus("mob_nav mob_nav_opened");
    else {
      setNavstatus("mob_nav");
    }
  };

  // eslint-disable-next-line arrow-body-style
  const activeStyle = ({ isActive }) => {
    return ({
      // backgroundColor: isActive ? 'var(--color-accent)' : 'white',
      color: isActive ? 'white' : '#2b2b2b',
    });
  };

  const display = () => {
    setPopup("popup_window display");
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
      postHotel(hotelData);
      toast.success("Succefully added hotel");
    } catch (err) {
      toast.error(error);
    }
  };

  return (
    <div className="content_holder">
      {/* ------------ Header ------------ */}
      <div className="hotels_holder_header">
        <button type="button" className="reserve_btn text_1" onClick={display}>Add Hotel</button>
        <h1 className="page_header_title">Hotel List</h1>
        <input type="text" className="search_box" placeholder="Search..." onChange={(event) => { setSearch(event.target.value); }} />
        <button type="button" className="mob_menu_btn" onClick={mobMenuAction}>
          <i className="fa fa-bars green_color" />
        </button>
      </div>
      {/* ------------------------- */}
      {/* ------------ Hotel list ----------- */}
      <div className="hotel_holder">
        {hotelError && <div> Error Loading Hotels</div>}
        {isLoadingHotels && <Loader />}
        {
          hotels && hotels.filter((element) => {
            if (search === "") {
              return element;
            }
            if (element.name.toLowerCase().includes(search.toLowerCase().trim())) {
              return element;
            }
          }).map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
        }
        {/* ----------------------------------- */}
        {/* ----------- Add new Hotel form Popup window  */}
        <div className={popup}>
          <div className="add_new_hotel_box">
            <div className="add_new_hotel_header">
              <h2 className="white_color">Add New Hotel</h2>
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
              <button type="submit" className="reserve_btn text_1">Add</button>
            </form>
            {/* ------------------------------------- */}
            <ToastContainer />
          </div>
        </div>
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

export default Hotels;
