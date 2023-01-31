/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import DashboardLayout from './layouts/dashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home';
import Booking from './components/booking';
import Hotels from './components/hotels';
import HotelShow from './components/hotelShow';
import './App.css';
import NotFound from './components/notfound';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId" element={<HotelShow />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
