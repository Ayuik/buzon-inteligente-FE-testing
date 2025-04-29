export const Button = ({ text, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-[#00328c] text-white w-[25vw] h-[3rem] rounded-[2rem] text-[1.123rem] border-none mx-auto cursor-pointer"
  >
    {text}
  </button>
);
