/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useGetBookingsQuery } from '../services/hotel';
import Loader from './Loader';
import '../assets/styles/booking.css';

const Booking = () => {
  const { data: bookings, error, isLoading } = useGetBookingsQuery();

  return (
    <div className="content_holder">
      <div className="hotels_holder_header">
        <h1>Booking List</h1>
      </div>
      <div>
        {error && <div> Error Loading Bookings</div>}
        {isLoading && <Loader />}
        <table className="table">
          <tr className="header">
            <th>Hotel Name</th>
            <th>Room Name</th>
            <th>From date</th>
            <th>For days</th>
            <th>Total Amount</th>
            <th> </th>
          </tr>
          {
            bookings?.map((booking) => (
              <tr key={booking.id}>
                <td>name</td>
                <td>name</td>
                <td>{booking.booking_date.substr(0, 10)}</td>
                <td>{booking.days}</td>
                <td>
                  $
                  {booking.amount}
                </td>
                <td>
                  <button type="button" className="cancel_btn">Cancel</button>
                </td>
              </tr>
            ))
            }
        </table>
      </div>
    </div>
  );
};

export default Booking;
