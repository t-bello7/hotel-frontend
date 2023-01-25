import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoomCard from './roomCard';
import { fetchRooms } from '../redux/rooms';
import { fetchHotels } from '../redux/hotels';
import rooms from './roomList.json';
import data from './list.json';
import './hotelShow.css';

export default function HotelShow() {
  const hotelRooms = useSelector((state) => state.rooms);
  const hotels = useSelector((state) => state.hotels);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotels(data));
    dispatch(fetchRooms(rooms));
  }, []);

  const { hotelName } = useParams();
  const hotel = hotels.find((h) => h.name === hotelName);
  const targetHotelRooms = hotelRooms.filter((room) => room.hotelId === hotel.id);
  const [popup, setPopup] = useState("popup_window ");
  const display = () => {
    setPopup("popup_window display");
  };
  return (
    <div className="hotel_show">
      <div className="hotel_content_panel">
        <div className="image_holder">
          <img src={hotel?.image} alt="hotel_image" className="banner_image" />
        </div>
        <div className="hotel_show_holder_header">
          <button type="button" className="reserve_btn text_1" onClick={display}>Add New Room</button>
        </div>
        <div className="rooms_panel">
          {
            targetHotelRooms.map((room) => <RoomCard key={room.id} room={room} />)
          }
        </div>
      </div>
      <div className="hotel_info_panel">
        <div className="info_holder">
          <h1>{hotel?.name}</h1>
          <p>
            Size :
            &nbsp;&nbsp;
            {hotel?.size}
          </p>
          <p>
            <i className="fa fa-phone green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            +964 750 111 2222
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
          <form className="add_new_hotel_form" method="get">
            <input type="text" name="name" className="form_feild" placeholder="Room Name" required />
            <input type="text" name="image" className="form_feild" placeholder="Room Image" required />
            <input type="number" name="beds" className="form_feild" placeholder="Beds" min={0} required />
            <input type="number" name="number" className="form_feild" placeholder="Number" min={0} required />
            <input type="number" name="price" className="form_feild" placeholder="Price" min={0} required />
            <input type="number" name="hotel_id" value={hotel.id} hidden readOnly />
            <input type="number" name="user_id" value={5} hidden readOnly />
            <button type="submit" className="reserve_btn text_1">Add</button>
          </form>
          {/* ------------------------------------- */}
        </div>
      </div>
    </div>
  );
}
