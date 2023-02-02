import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';
import { selectUserToken } from '../features/auth/authSlice';
import {
  useGetHotelQuery, useGetRoomQuery, useDeleteBookingMutation, usePutRoomMutation
} from '../services/hotel';

const BookingValue = (props) => {
  const { booking } = props;
  const hotelId = booking.hotel_id;
  const roomId = booking.room_id;
  const token = useSelector(selectUserToken);
  const [updateRoom] = usePutRoomMutation();
  const { data } = useGetHotelQuery(booking.hotel_id);
  const { data: roomData } = useGetRoomQuery({ hotelId, roomId });
  const [deleteBooking] = useDeleteBookingMutation();
  const { user_id: userId } = jwt(token);

  const handleBookingDelete = (bookingId) => {
    deleteBooking({ userId, bookingId });
    updateRoom({
      hotelId, userId, roomId, credentials: { reserved: false }
    });
  };

  return (
    <tr>
      <td className="data_feild">{ data?.name }</td>
      <td className="data_feild">{ roomData?.name }</td>
      <td className="data_feild">{booking.booking_date.substr(0, 10)}</td>
      <td className="data_feild">{booking.days}</td>
      <td className="data_feild">
        $
        {booking.amount}
      </td>
      <td>
        <button type="button" className="cancel_btn" onClick={() => handleBookingDelete(booking.id)}>Cancel</button>
      </td>
    </tr>
  );
};

BookingValue.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  booking: PropTypes.object.isRequired
};
export default BookingValue;
