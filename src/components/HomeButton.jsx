import React from 'react';
// import { useNavigate } from 'react-router-dom';

export const HomeButton = ({text}) => {


  return (
    <button /* onClick={action} */ id="home-btn">
      {text}
    </button>
  );
}