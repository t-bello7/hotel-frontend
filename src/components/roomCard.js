import React from 'react';
import PropTypes from 'prop-types';
import './roomCard.css';

export default function RoomCard(props) {
  const { room } = props;
  const visibile = (room.number) ? "reserve_btn text_1" : "reserve_btn text_1 disable";
  return (
    <div className="room_card" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
      <div className="room_image_holder">
        <img src={room.image} alt="room_image" className="room_image" />
      </div>
      <div className="room_info_holder">
        <div className="d_flex space_between">
          <h2 className="text_1">{room.name}</h2>
          <h2 className="text_1">
            <i className="fa fa-money green_color" aria-hidden="true" />
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
          <h2 className={visibile}>Reserve</h2>
        </div>
      </div>
    </div>
  );
}

RoomCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired
};
