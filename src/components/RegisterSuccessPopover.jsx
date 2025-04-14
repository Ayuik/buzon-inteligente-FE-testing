import { forwardRef } from "react";
import { Link } from "react-router-dom";
export const RegisterSuccessPopover = forwardRef(({ message, buttonLabel = "Aceptar", to = "/login", onAccept }, ref) => {
  return (
    <div
      id="success-popover"
      ref={ref}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 inline-block w-[90%] max-w-sm text-sm text-[#00174B] transition-opacity duration-300 bg-[#E1E5FF] border border-[#00174B] rounded-lg shadow-lg opacity-0 invisible"
    >
      <div id="success-popover-header" className="px-4 py-3 border-b border-[#00174B] rounded-t-lg">
        <h3 id="success-message-title" className="font-semibold text-center text-lg">
          {message}
        </h3>
      </div>
      <div id="success-popover-body" className="px-4 py-2 text-center">
        <Link to={to}>
          <button
            id="success-accept-button"
            onClick={onAccept}
            className="bg-[#00174B] hover:opacity-90 text-white px-4 py-2 rounded-md mt-2"
          >
            {buttonLabel}
          </button>
        </Link>
      </div>
    </div>
  );
});