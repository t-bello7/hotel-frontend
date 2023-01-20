const GET_ROOMS = 'rooms.get';

export default function getRooms(state = [], action) {
  switch (action.type) {
    case GET_ROOMS: return action.payload;
    default: return state;
  }
}

export const fetchRooms = (rooms) => ({
  type: GET_ROOMS,
  payload: rooms,
});
