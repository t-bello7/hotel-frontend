/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Booking from './components/booking';
import Home from './components/home';
import Hotels from './components/hotels';
import Navigation from './components/navigation';
import './App.css';
import store from './redux/configStore';
import HotelShow from './components/hotelShow';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <div className="app_holder">
            <div>
              <Navigation />
            </div>
            <div>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<User />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotels/:hotelName" element={<HotelShow />} />
                <Route path="booking" element={<Booking />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
