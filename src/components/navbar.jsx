import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoEureka.png";
import dropdownIcon from "../assets/dropdown.svg";
import { useAuth } from "../context/AuthProvider";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const {setToken} = useAuth
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  const isHome = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";
  const isLoggedIn = !!localStorage.getItem("token");


  return (
    <nav className="bg-[#00328C] text-white px-6 py-4">
      <div className="flex justify-between items-center">
      <Link to={isLoggedIn ? "/packages" : "/"}>
          <img src={logo} alt="Eureka logo" className="h-10 cursor-pointer" />
        </Link>

        {!isHome && (
          <>
            <ul className="hidden md:flex space-x-10 font-semibold text-base">
              <li><Link to="/user/packages" className="hover:underline">Mis paquetes</Link></li>
              <li><Link to="/notifications" className="hover:underline">Mis notificaciones</Link></li>
              <li><Link to="/user/myaccount" className="hover:underline">Mi cuenta</Link></li>
              <li><Link to="/" onClick={handleLogout} className="hover:underline">Cerrar sesión</Link></li>
            </ul>
            <div className="md:hidden relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
                <img src={dropdownIcon} alt="Menú" className="w-8 h-8" />
              </button>

              {menuOpen && (
                <ul data-testid="mobile-menu" className="absolute right-0 mt-2 w-48 bg-[#002f86] border border-white rounded-lg shadow-lg space-y-2 py-2 text-sm font-semibold z-50">
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/user/packages" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Mis paquetes</Link>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/notification" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Mis notificaciones</Link>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/user/myaccount" className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Mi cuenta</Link>
                  </li>
                  <li onClick={() => setMenuOpen(false)}>
                    <Link to="/" onClick={handleLogout} className="block px-4 py-2 hover:bg-white hover:text-[#002f86]">Cerrar sesión</Link>
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
