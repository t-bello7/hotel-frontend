import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useGetHotelQuery, useGetRoomsQuery, usePostRoomMutation } from '../services/hotel';
import RoomCard from './roomCard';
import Loader from './Loader';
import '../assets/styles/hotelShow.css';

export default function HotelShow() {
  const { hotelId } = useParams();
  const { data: hotel, error, isLoading } = useGetHotelQuery(hotelId);
  const { data: rooms, error: roomsError, isLoading: roomsIsLoading } = useGetRoomsQuery(hotelId);
  const [postRoom, { isLoading: roomisLoading, roomError }] = usePostRoomMutation();
  const [roomData, setRoomData] = useState({
    name: '',
    hotel_id: hotelId,
    type: '',
    bed_count: 0,
    price: 0,
  });
  const [popup, setPopup] = useState("popup_window ");

  const display = () => {
    setPopup("popup_window display");
  };

  const handleRoomFormChange = (event) => {
    setRoomData({
      ...roomData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      postRoom(roomData);
      toast.success("Succesfully added Room");
    } catch (err) {
      toast.error(roomError);
    }
  };

  return (
    <div className="hotel_show">
      <div className="hotel_content_panel">
        { error && <div> Error Loading Data </div>}
        { isLoading && <Loader /> }
        <div className="image_holder">
          {/* <img src={hotel?.image} alt="hotel_image" className="banner_image" /> */}
        </div>
        <div className="hotel_show_holder_header">
          <button type="button" className="reserve_btn text_1" onClick={display}>Add New Room</button>
        </div>
        <div className="rooms_panel">
          { roomsError && <div> Error Loading Data </div>}
          { roomsIsLoading && <Loader /> }
          {
            rooms?.map((room) => <RoomCard key={room.id} room={room} />)
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
            { roomisLoading && <Loader /> }
            <input type="text" name="name" className="form_feild" onChange={handleRoomFormChange} value={roomData?.name} placeholder="Room Name" required />
            <input type="number" name="bed_count" className="form_feild" onChange={handleRoomFormChange} value={roomData?.bed_count} placeholder="Beds" min={1} required />
            <select name="type" id="type" className="form_field" onChange={handleRoomFormChange}>
              <option value="">-- Please choose a Room Type --</option>
              <option value="single-room"> Single Room </option>
              <option value="couple-room"> Couple Room </option>
              <option value="conference-hall"> Conference Hall </option>
            </select>
            <input type="number" name="price" className="form_feild" onChange={handleRoomFormChange} value={roomData?.price} placeholder="Price" min={1} required />
            <button type="submit" className="reserve_btn text_1">Add</button>
            <ToastContainer />
          </form>
          {/* ------------------------------------- */}
        </div>
      </div>
    </div>
  );
}
