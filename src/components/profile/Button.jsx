export const Button = ({ text, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-2/3 max-w-xs py-3 rounded-full text-lg text-white bg-[#00328c] hover:opacity-90 cursor-pointer"
  >
    {text}
  </button>
);
