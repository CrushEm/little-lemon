// LanderScreen.js
import React from 'react';

import logo from '../assets/logo.png';
import feature from '../assets/feature.jpg'
import '../App.css';
import Button from '../components/button';


const LanderScreen = ({ navigation }) => {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="" alt="logo" />
        <img src={feature} className="" alt="feature" />

        <Button className="primary" to="Menu" disabled={true}>View Menu</Button>
        <Button className="secondary" to="Booking" >Book Seating</Button>
        <Button className="primary"  disabled={true} >About Us</Button>

        </header>
    </div>
  );
};

export default LanderScreen;