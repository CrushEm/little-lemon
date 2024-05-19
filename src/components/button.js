import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PiCaretCircleLeftBold, PiCaretLeftFill } from "react-icons/pi";

const Button = ({ to = "", children, className, disabled = false, ariaLabel="Click Me" }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(to);
    if (to === 'back') {
      navigate(-1);
    } else if(to !== "") {
      navigate('/' + to);
    }
  };

  return (
    <>
      {disabled ? (
        <>
          <button className={`inactive ${className}`} disabled>
            {children}
          </button>
        </>
      ) : (
        <>
          {to === 'back' ? (
            <button className="icon" onClick={handleClick} aria-label={ariaLabel}>
              <PiCaretLeftFill />
            </button>
          ) : (
            <button className={className} onClick={handleClick} aria-label={ariaLabel}>
              {children}
            </button>
          )}
        </>
      )}
    </>
  );
}

export default Button;