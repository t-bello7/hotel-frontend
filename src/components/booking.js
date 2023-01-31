/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetBookingsQuery } from '../services/hotel';
import Loader from './Loader';
import '../assets/styles/booking.css';

const Booking = () => {
  const { data: bookings, error, isLoading } = useGetBookingsQuery();
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

  return (
    <div className="content_holder">
      <div className="hotels_holder_header">
        <h1>Booking List</h1>
        <button type="button" className="mob_menu_btn" onClick={mobMenuAction}>
          <i className="fa fa-bars green_color" />
        </button>
      </div>
      <div>
        {error && <div> Error Loading Bookings</div>}
        {isLoading && <Loader />}
        <table className="table">
          <thead>
            <tr className="header">
              <th className="header_feild">Hotel Name</th>
              <th className="header_feild">Room Name</th>
              <th className="header_feild">From date</th>
              <th className="header_feild">For days</th>
              <th className="header_feild">Total Amount</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
            bookings?.map((booking) => (
              <tr key={booking.id}>
                <td className="data_feild">name</td>
                <td className="data_feild">name</td>
                <td className="data_feild">{booking.booking_date.substr(0, 10)}</td>
                <td className="data_feild">{booking.days}</td>
                <td className="data_feild">
                  $
                  {booking.amount}
                </td>
                <td>
                  <button type="button" className="cancel_btn">Cancel</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
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

export default Booking;
