import { HomeButton } from "./HomeButton";

export const Home = () => {
  return (
    <div className="flex flex-col items-center gap-4  justify-center items-center w-1/2">
      <HomeButton id="login-btn" text="Iniciar sesión" />
      <HomeButton id="register-btn" text="Registrarse" />
    </div>
  );
}