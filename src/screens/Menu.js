// LanderScreen.js
import React from 'react';
import '../App.css';
import BackHeader from '../components/backHeader.js';

import feature1 from '../assets/feature.jpg';

const menuItems = [
  {
    picture: feature1,
    title: 'Menu Item 1',
    starRating: 4,
    description: 'Description of Menu Item 1...',
  },
  {
    picture: "./assets/feature2.jpg",
    title: 'Menu Item 2',
    starRating: 5,
    description: 'Description of Menu Item 2...',
  },
  // Add more menu items as needed
];

const MenuScreen = ({ navigation }) => {

  return (
    <div className="">
      <BackHeader title="Menu"></BackHeader>
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={item.picture} alt={item.title} />
            <div className="menu-details">
              <h2>{item.title}</h2>
              <div className="star-rating">{item.starRating} Stars</div>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default MenuScreen;