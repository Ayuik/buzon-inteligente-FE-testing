import { Link } from "react-router-dom";
import { forwardRef } from "react";

export const LoginSuccessPopover = forwardRef(({ title, message, to, buttonLabel }, ref) => {
  return (
    <div
      ref={ref}
      id="success-popover"
      className="absolute left-1/2 top-16 -translate-x-1/2 z-50 inline-block w-80 text-sm text-[#00174B] transition-opacity duration-300 bg-[#E1E5FF] border border-[#00174B] rounded-lg shadow-lg opacity-0 invisible"
    >
      <div className="px-4 py-3 border-b border-[#00174B] rounded-t-lg">
        <h3 className="font-semibold text-center text-lg">{title}</h3>
      </div>
      <div className="px-4 py-2 text-center">
        <p>{message}</p>
        <Link
          to={to}
          id="popover-accept"
          className="inline-block bg-[#00174B] hover:opacity-90 text-white px-4 py-2 rounded-md mt-3"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
});
