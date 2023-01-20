import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchHotels } from '../redux/hotels';
import HotelCard from './hotelCard';
import data from './list.json';

export default function Hotels() {
  const hotels = useSelector((state) => state.hotels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHotels(data));
  }, []);

  return (
    <div className="content_holder">
      {
        hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
      }
    </div>
  );
}
