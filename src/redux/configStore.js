import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import getHotels from './hotels';
import userLoginReducer from './reducers/userLoginReducer';
import userRegisterReducer from './reducers/userRegisterReducer';
import usersListReducer from './reducers/usersListReducer';
import getRooms from './rooms';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  usersList: usersListReducer,
  hotels: getHotels,
  rooms: getRooms
});
const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

store.subscribe(() => {
  // console.log('Store changed ! ', store.getState());
});
export default store;
