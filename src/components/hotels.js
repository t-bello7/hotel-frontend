/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { usePostHotelMutation, useGetHotelsQuery } from '../services/hotel';
import Loader from './Loader';
import HotelCard from './hotelCard';
import '../assets/styles/hotels.css';

export default function Hotels() {
  const {error: hotelError, isLoading: isLoadingHotels } = useGetHotelsQuery();
  const [postHotel, { isLoading, error }] = usePostHotelMutation();
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    email: '',
    phone_number: ''
  });
  const [popup, setPopup] = useState("popup_window");
  const [search, setSearch] = useState("");
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
        <h1>Hotel List</h1>
        <input type="text" className="form_feild" placeholder="Search..." onChange={(event) => { setSearch(event.target.value); }} />
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
    </div>
  );
}
