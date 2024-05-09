import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanderScreen from './screens/Lander.js';
import MenuScreen from './screens/Menu.js';
// import BookingScreen from './screens/BookingScreen';
// import AboutUsScreen from './screens/AboutUsScreen';
// import CheckoutScreen from './screens/CheckoutScreen';
// import ConfirmScreen from './screens/ConfirmScreen';

function App() {
  return (

    <Router>
      <Routes>
        {/* <Route path="/confirm" element={<ConfirmScreen />} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/about-us" element={<AboutUsScreen />} />
        <Route path="/booking" element={<BookingScreen />} />*/}
        <Route path="/menu" element={<MenuScreen />} /> 
        <Route path="/" element={<LanderScreen />} />
      </Routes>
    </Router>

  );
}

export default App;
