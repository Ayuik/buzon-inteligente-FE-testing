import React from 'react';

export const HomeButton = ({action, text}) => {

  return (
    <button onClick={action} id="home-btn" 
    className='w-1/4 bg-btn-blue text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl py-2 sm:py-2.5 md:py-3.5 px-4 sm:px-5 md:px-6 rounded-xl transition duration-200 cursor-pointer'>
      {text}
    </button>
  );
}