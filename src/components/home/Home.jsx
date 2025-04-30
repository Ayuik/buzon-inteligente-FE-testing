import { HomeButton } from "./HomeButton";

export const Home = ({ onLoginClick, onRegisterClick }) => {
  
  return (
    <>
      <HomeButton id="login-btn" text="Iniciar sesión" action={onLoginClick} />
      <HomeButton id="register-btn" text="Registrarse" action={onRegisterClick} />
    </>
  );
}