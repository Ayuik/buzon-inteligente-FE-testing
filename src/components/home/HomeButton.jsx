
export const HomeButton = ({action, text}) => {

  return (
    <button onClick={action} id="home-btn" 
    className='w-1/4 lg:w-1/5 bg-[#4574FF] hover:bg-[#00328C] text-white font-bree text-xs py-1.5 sm:text-base sm:py-3 rounded-xl transition duration-200 cursor-pointer m-2'>
      {text}
    </button>
  );
}