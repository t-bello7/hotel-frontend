/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Booking from './components/booking';
import Home from './components/home';
import Hotels from './components/hotels';
import Navigation from './components/navigation';
import './App.css';
import store from './redux/configStore';

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
                <Route path="/hotels" element={<Hotels />} />
                {/* <Route path="/hotels/:hotel_id" element={<Hotels />} /> */}
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
