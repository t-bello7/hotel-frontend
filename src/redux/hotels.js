const GET_HOTELS = 'hotels.get';

export default function getHotels(state = [], action) {
  switch (action.type) {
    case GET_HOTELS: return action.payload;
    default: return state;
  }
}

export const fetchHotels = (hotels) => ({
  type: GET_HOTELS,
  payload: hotels,
});
