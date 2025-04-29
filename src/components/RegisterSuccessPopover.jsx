import React from "react";
import { Link } from 'react-router-dom';

export const RegisterSuccessPopover = () => {
  return (
    <div
    id="success-popover"
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#E1E5FF] text-[#00174B] shadow-lg border border-gray-300 rounded-2xl transition-opacity duration-300 font-bree p-10">
      <Link to="/login" title="Go to login">
        <span className="absolute top-[5%] right-[7%] text-[2.5rem] font-bold text-[#00174B] cursor-pointer">
         X
        </span>
      </Link>
      <div>
        <h3 className="text-[200%] font-semibold mb-[4%]">
          ¡Registro completado!
        </h3>
        <p className="text-[145%]">
          Ya puedes iniciar sesión
        </p>
      </div>
    </div>
  );
};

