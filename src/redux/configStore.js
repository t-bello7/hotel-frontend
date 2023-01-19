import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import getHotels from './hotels';

const rootReducer = combineReducers({ hotels: getHotels });
const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

store.subscribe(() => {
  // console.log('Store changed ! ', store.getState());
});
export default store;
