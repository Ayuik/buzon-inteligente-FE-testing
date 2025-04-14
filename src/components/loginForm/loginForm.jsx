import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginSuccessPopover } from "../LoginSuccessPopover";
import { login as loginService } from "../../Services/AuthService";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const popoverRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormErrors((prev) => ({ ...prev, email: emailRegex.test(value) ? "" : "Correo inválido" }));
    }

    if (name === "password") {
      setFormErrors((prev) => ({ ...prev, password: value.trim() === "" ? "La contraseña es obligatoria" : "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");

    if (!formErrors.email && !formErrors.password) {
      try {
        const { token } = await loginService(formData.email, formData.password);
        localStorage.setItem("token", token);
        const popover = popoverRef.current;
        if (popover) {
          popover.classList.remove("opacity-0", "invisible");
          popover.classList.add("opacity-100", "visible");
        }
      } catch (err) {
        setLoginError("No se ha podido conectar con el servidor.");
      }
    }
  };

  const isDisabled = !formData.email || !formData.password || formErrors.email || formErrors.password;

  return (
    <form id="form-component" className="flex flex-col items-center justify-center min-h-screen px-4 font-bree" onSubmit={handleSubmit}>
      <div id="form-login" className="flex flex-col items-center justify-center bg-[#bec7ff47] rounded-3xl w-full max-w-md py-10 px-6 md:px-10">
        <div id="title-login" className="text-[#00174b] text-2xl font-semibold mb-6"><h2>Iniciar sesión</h2></div>
        <div id="inputs-form" className="w-full space-y-4">
          <input id="input-email" type="email" name="email" placeholder="Correo electrónico:" onChange={handleChange} className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400" />
          {formErrors.email && (<p id="error-email" className="text-red-500 text-sm">{formErrors.email}</p>)}
          <input id="input-password" type="password" name="password" placeholder="Contraseña:" value={formData.password} onChange={handleChange} className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400" />
          {formErrors.password && (<p id="error-password" className="text-red-500 text-sm">{formErrors.password}</p>)}
          {loginError && <p id="login-error" className="text-red-600 text-sm">{loginError}</p>}
        </div>
      </div>

      <div id="button-login" className="mt-6 mb-4 font-bree relative w-full max-w-md flex justify-center">
        <button id="submit-button" type="submit" disabled={isDisabled} className={`w-2/3 max-w-xs py-3 rounded-full text-lg text-white ${isDisabled ? "bg-[#00328c] opacity-50 cursor-not-allowed" : "bg-[#00328c] hover:opacity-90 cursor-pointer"}`}>Enviar</button>
        <LoginSuccessPopover ref={popoverRef} title="Login exitoso" message="¡Bienvenido/a! Has iniciado sesión correctamente." to="/packages" buttonLabel="Aceptar" />
      </div>

      <div id="changePassword" className="font-bree text-[#00174b] text-sm"><Link to="/changePassword">¿Has olvidado tu contraseña?</Link></div>
    </form>
  );
}
