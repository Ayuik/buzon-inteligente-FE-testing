export const Button = ({ text, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-[#00328c] text-white w-[170px] h-[45px] rounded-[32px] text-[18px] border-[none] mx-auto cursor-pointer"
  >
    {text}
  </button>
);
