import { HomeButton } from "./HomeButton";

export const Home = ({ onLoginClick, onRegisterClick }) => {
  
  return (
    <div className="flex flex-col items-center gap-4  justify-center items-center w-full sm:w-1/2 my-7 sm:my-0">
      <HomeButton id="login-btn" text="Iniciar sesión" action={onLoginClick} />
      <HomeButton id="register-btn" text="Registrarse" action={onRegisterClick} />
    </div>
  );
}