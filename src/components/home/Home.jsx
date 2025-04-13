import { HomeButton } from "./HomeButton";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center gap-4  justify-center items-center w-full sm:w-1/2 my-7 sm:my-0">
      <HomeButton id="login-btn" text="Iniciar sesión" action={() => navigate("/login")} />
      <HomeButton id="register-btn" text="Registrarse" action={() => navigate("/register")} />
    </div>
  );
}