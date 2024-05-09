import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBeer } from "react-icons/fa";

const Button = ({ to, children, className }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if(to === 'back'){
      navigate(-1);
    }{
      navigate(to);
    }

  };

  return (
    <>
      {to === 'back' ? (
        <button className="icon" onClick={handleClick}>
          <FaBeer />
        </button>
      ) : (
        <button className={className} onClick={handleClick}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;