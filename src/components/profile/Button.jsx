export const Button = ({ text, onClick, type = "button" }) => (
    <button type={type} onClick={onClick} className="bg-[#00328c] text-[#ffffff] w-[184px] h-[54px] m-[center] rounded-[32px] text-[22px] border-[none] cursor-pointer">
        {text}
    </button>
);

