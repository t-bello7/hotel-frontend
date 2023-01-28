import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "./services/hotel";
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    [hotelApi.reducerPath]: hotelApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hotelApi.middleware),
});

setupListeners(store.dispatch);
export default store;
