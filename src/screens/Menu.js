// LanderScreen.js
import React from 'react';

import logo from '../assets/logo.png';
import feature from '../assets/feature.jpg'
import '../App.css';

import HeaderWithBackButton from '../components/HeadWithBackButon';


const MenuScreen = ({ navigation }) => {
  return (
    <div className="App">
      <HeaderWithBackButton title="Menu"></HeaderWithBackButton>
    </div>
  );
};

export default MenuScreen;