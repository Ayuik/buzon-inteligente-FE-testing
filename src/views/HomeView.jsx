import { Home } from "../components/home/Home";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const HomeView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRoot = location.pathname === "/";
  return (
        <div className="flex flex-col sm:flex-row w-full h-full">
            <div id="img-home" className="w-full sm:w-1/2">
                <img src="/img/Captura.PNG" alt="" className=" h-full object-cover"/>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col items-center justify-center">
              {isRoot && (
                <Home
                  onLoginClick={() => navigate("/login")}
                  onRegisterClick={() => navigate("/register")}
                />
              )}
              <Outlet />
            </div>
        </div>
  );
}