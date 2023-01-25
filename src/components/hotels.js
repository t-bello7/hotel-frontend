/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from '../redux/hotels';
import HotelCard from './hotelCard';
import data from './list.json';
import './hotels.css';

export default function Hotels() {
  const hotels = useSelector((state) => state.hotels);
  const [popup, setPopup] = useState("popup_window");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotels(data));
  }, []);

  const display = () => {
    setPopup("popup_window display");
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
        {
          hotels.filter((element) => {
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
            <form className="add_new_hotel_form" method="get">
              <input type="text" name="name" className="form_feild" placeholder="Hotel Name" required />
              <input type="text" name="image" className="form_feild" placeholder="Hotel Image" required />
              <input type="text" name="location" className="form_feild" placeholder="Location" required />
              <input type="text" name="size" className="form_feild" placeholder="Hotel Size" required />
              <input type="email" name="email" className="form_feild" placeholder="Email" required />
              <input type="number" name="user_id" value={5} hidden readOnly />
              <button type="submit" className="reserve_btn text_1">Add</button>
            </form>
            {/* ------------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
