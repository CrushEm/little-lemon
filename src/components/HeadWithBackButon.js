import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Button from './button';
import { useNavigate} from 'react-router-dom';

const HeaderWithBackButton = ({ title }) => {

  return (
    <div className="">
      <Button to="back">{title}</Button>
      <h1 className="">{title}</h1>
    </div>
  );
};

export default HeaderWithBackButton;