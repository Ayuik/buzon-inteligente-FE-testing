import { forwardRef } from "react";
import { Link } from "react-router-dom";

export const LoginSuccessPopover = forwardRef(
  ({ title = "Login exitoso", message, buttonLabel = "Aceptar", to = "/packages", onAccept }, ref) => {
    return (
      <div
        id="success-popover"
        ref={ref}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[35%] bg-[#E1E5FF] text-[#00174B] shadow-lg border border-gray-300 rounded-2xl opacity-0 invisible transition-opacity duration-300 font-bree"
      >
        <div
          id="success-popover-header"
          className="px-6 py-4 border-[#00174B] rounded-t-2xl text-center"
        >
          <h3 id="success-message-title" className="text-lg font-semibold">
            {title}
          </h3>
          <p className="mt-2">{message}</p>
        </div>
        <div
          id="success-popover-body"
          className="px-6 py-4 flex justify-center"
        >
          <Link to={to}>
            <button
              id="success-accept-button"
              onClick={onAccept}
              className="bg-[#00328C] hover:opacity-90 text-white px-6 py-2 rounded-full transition"
            >
              {buttonLabel}
            </button>
          </Link>
        </div>
      </div>
    );
  }
);
