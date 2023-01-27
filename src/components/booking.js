/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
// import { useSelector } from 'react-redux';
import React, { useState } from 'react';
// import RoomCard from './roomCard';

export default function Booking() {
  // const hotelRooms = useSelector((state) => state.rooms);
  const [setSearch] = useState("");
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
        {/* {
          hotelRooms.filter((element) => {
            if (search === "") {
              return element;
            }
            if (element.name.toLowerCase().includes(search.toLowerCase().trim())) {
              return element;
            }
          }).map((room) => <RoomCard key={room.id} room={room} />)
        } */}
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
