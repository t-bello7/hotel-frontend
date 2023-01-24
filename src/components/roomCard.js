import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './roomCard.css';
import { useParams } from 'react-router-dom';

export default function RoomCard(props) {
  const { room } = props;
  const { hotelName } = useParams();
  const [display, setDisplay] = useState(false);
  const [total, setTotal] = useState(0);

  const visibile = (room.number) ? "reserve_btn text_1" : "reserve_btn text_1 disable";
  const popupClass = display ? "popup_window display" : "popup_window";

  const reserving = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  return (
    <div className="room_card">
      <div className="room_image_holder">
        <img src={room.image} alt="room_image" className="room_image" />
      </div>
      <div className="room_info_holder">
        <div className="d_flex space_between">
          <h2 className="text_1">{room.name}</h2>
          <h2 className="text_1">
            <i className="fa fa-money green_color" />
            &nbsp;&nbsp; $
            {room.price}
          </h2>
        </div>
        <div className="d_flex space_between">
          <h2 className="text_1">
            <i className="fa fa-bed green_color" aria-hidden="true" />
            &nbsp;&nbsp;
            {room.beds}
          </h2>
          <button type="button" className={visibile} onClick={reserving} disabled={!room.number}>Book Now</button>
          <div className={popupClass}>
            <div className="reserve_box">
              <div className="popupheader">
                <button type="button" onClick={close} className="close_btn">
                  <i className="fa fa-times" />
                </button>
              </div>
              <h1>
                <i className="fa fa-building green_color" />
                &nbsp;&nbsp;
                {hotelName}
              </h1>
              <hr />
              <h3 className="fixed_info">
                <i className="fa fa-tag green_color" />
                &nbsp;&nbsp;&nbsp;
                Room Type:
                &nbsp;
                {room.name}
              </h3>
              <h3 className="fixed_info">
                <i className="fa fa-bed green_color" />
                &nbsp;&nbsp;
                Beds:
                &nbsp;
                {room.beds}
              </h3>
              <h3 className="fixed_info">
                <i className="fa fa-money green_color" />
                &nbsp;&nbsp;
                Price:
                &nbsp;$
                {room.price}
              </h3>
              <form className="reserve_form" method="get">
                <label htmlFor="formDate">
                  From:
                  &nbsp;
                  <input type="date" name="date" className="form_feild" id="formDate" required />
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                <br />
                <label htmlFor="daysNumber">
                  &nbsp;&nbsp;
                  For:
                  &nbsp;
                  <input type="number" name="days" className="form_feild small_feild" id="daysNumber" onChange={(event) => { setTotal(event.target.value * room.price); }} min="0" required />
                  &nbsp; Days
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                Total:
                &nbsp;$
                { total }
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <input type="number" name="user_id" value={1} hidden readOnly />
                  <input type="number" name="room_id" value={room.id} hidden readOnly />
                  <input type="number" name="amount" value={total} hidden readOnly />
                  <button type="submit" className="reserve_btn text_1">Reserve</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RoomCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired
};
