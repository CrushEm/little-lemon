import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PiCaretCircleLeftBold, PiCaretLeftFill } from "react-icons/pi";

const Button = ({ to, children, className }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(to); 
    if(to === 'back'){
      navigate(-1);
    }else{
      navigate('/'+to);
    }
  };

  return (
    <>
      {to === 'back' ? (
        <button className="icon" onClick={handleClick}>
          <PiCaretLeftFill />
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