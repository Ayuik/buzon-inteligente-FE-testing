import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoEureka.png";
import dropdownIcon from "../assets/dropdown.svg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="bg-[#00328C] text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Eureka logo" className="h-12 cursor-pointer" />
        </Link>

        {!isHome && (
          <>
            <ul className="hidden md:flex space-x-10 font-semibold text-base">
              <li><Link to="/packages" className="hover:underline">Mis paquetes</Link></li>
              <li><Link to="/notifications" className="hover:underline">Mis notificaciones</Link></li>
              <li><Link to="/account" className="hover:underline">Mi cuenta</Link></li>
              <li><Link to="/" className="hover:underline">Cerrar sesión</Link></li>
            </ul>
            <div className="md:hidden relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
                <img src={dropdownIcon} alt="Menú" className="w-8 h-8" />
              </button>

              {menuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-[#002f86] border border-white rounded-lg shadow-lg space-y-2 py-2 text-sm font-semibold z-50">
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/packages" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Mis paquetes</Link>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/notification" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Mis notificaciones</Link>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/account" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Mi cuenta</Link>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Cerrar sesión</Link>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
