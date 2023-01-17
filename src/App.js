/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Booking from './components/booking';
import Home from './components/home';
import Hotels from './components/hotels';
import Navigation from './components/navigation';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app_holder">
          <div>
            <Navigation />
          </div>
          <div>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="booking" element={<Booking />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
