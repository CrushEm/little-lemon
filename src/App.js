import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanderScreen from './screens/Lander.js';
import MenuScreen from './screens/Menu.js';
import {BookingScreen} from './screens/Booking.js';
// import AboutUsScreen from './screens/AboutUsScreen';
// import CheckoutScreen from './screens/CheckoutScreen';
// import ConfirmScreen from './screens/ConfirmScreen';
import { AlertProvider } from "./context/alertContext";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <div className="App-Contrainer">
          <Router>
            <Routes>
              {/* <Route path="/confirm" element={<ConfirmScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/about-us" element={<AboutUsScreen />} />*/}
              <Route path="/booking" element={<BookingScreen />} />
              <Route path="/menu" element={<MenuScreen />} />
              <Route path="/" element={<LanderScreen />} />
            </Routes>
          </Router>
        </div>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
