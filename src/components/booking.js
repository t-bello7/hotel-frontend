/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useGetBookingsQuery } from '../services/hotel';
import Loader from './Loader';

export default function Booking() {
  const {error, isLoading } = useGetBookingsQuery();
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState("popup_window");

  const display = () => {
    setPopup("popup_window display");
  };
  return (
    <div className="content_holder">
      <div className="hotels_holder_header">
        <button type="button" className="reserve_btn text_1" onClick={display}>Make Payments</button>
        <h1>Booking List</h1>
        <input type="text" className="form_feild" placeholder="Search..." onChange={(event) => { setSearch(event.target.value); }} />
      </div>
      <div className="rooms_panel">
        {error && <div> Error Loading Bookings</div>}
        {isLoading && <Loader />}
        {
          bookings?.filter((element) => {
            if (search === "") {
              return element;
            }
            if (element.date.toLowerCase().includes(search.toLowerCase().trim())) {
              return element;
            }
          }).map((booking) => (
            <div key={booking.id}>
              date :
              {' '}
              {booking.date}
              amount:
              {' '}
              {booking.amount}
            </div>
          ))
}
      </div>

      <div className={popup}>
        <div className="add_new_hotel_box">
          <div className="add_new_hotel_header">
            <h2 className="white_color">Make Payments </h2>
            <button type="button" onClick={() => setPopup("popup_window")} className="close_btn">
              <i className="fa fa-times white_color" />
            </button>
          </div>
          <div>
            List booked rooms
          </div>
        </div>
      </div>
    </div>
  );
}
