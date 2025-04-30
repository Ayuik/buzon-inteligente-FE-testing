import { Link } from "react-router-dom";

export function SuccessModal({ title, message, buttonLabel = "Aceptar", to = "/packages", onAccept }) {
  return (
    <div
      data-testid="success-popover"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#E1E5FF] text-[#00174B] shadow-lg border border-gray-300 rounded-2xl transition-opacity duration-300 font-bree"
    >
      <div className="px-6 py-4 border-[#00174B] rounded-t-2xl text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2">{message}</p>
      </div>
      <div className="px-6 py-4 flex justify-center">
        <Link to={to}>
          <button
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
