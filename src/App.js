/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configStore';
import DashboardLayout from './layouts/dashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Home from './pages/home';
import Booking from './components/booking';
import Hotels from './components/hotels';
import HotelShow from './components/hotelShow';
import './App.css';
import NotFound from './components/notfound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<DashboardLayout />}>
            <Route path="/users" element={<User />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:hotelName" element={<HotelShow />} />
            <Route path="booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
