// LanderScreen.js
import React from 'react';

import logo from '../assets/logo.png';
import feature from '../assets/feature.jpg'
import '../App.css';

import BackHeader from '../components/backHeader.js';


const MenuScreen = ({ navigation }) => {
  return (
    <div className="App">
      <BackHeader title="Menu"></BackHeader>
    </div>
  );
};

export default MenuScreen;