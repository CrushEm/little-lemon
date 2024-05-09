import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ to, children, className }) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    if(to === 'back'){
      navigate(-1);
    }else{
      navigate(to);
    }

  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;