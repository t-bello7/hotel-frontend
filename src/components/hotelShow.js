import React, { useEffect } from 'react';
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
  return (
    <div className="hotel_show">
      <div className="hotel_content_panel">
        <div className="image_holder">
          <img src={hotel?.image} alt="hotel_image" className="banner_image" />
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
    </div>
  );
}
