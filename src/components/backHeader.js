import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from './button';
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ title }) => {

  return (
    <div >
      <div className="back-header">
        <div className="">
          <Button to="back">{title}</Button>
        </div>
        <h1>{title}</h1>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default BackHeader;