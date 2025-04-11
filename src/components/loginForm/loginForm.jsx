import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginSuccessPopover } from "../LoginSuccessPopover";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const popoverRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Correo inválido",
      }));
    }

    if (name === "password") {
      setFormErrors((prev) => ({
        ...prev,
        password: value.trim() === "" ? "La contraseña es obligatoria" : "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formErrors.email && !formErrors.password) {
      const popover = popoverRef.current;
      if (popover) {
        popover.classList.remove("opacity-0", "invisible");
        popover.classList.add("opacity-100", "visible");
      }
    }
  };

  const isDisabled =
    !formData.email ||
    !formData.password ||
    formErrors.email ||
    formErrors.password;

  return (
    <form id="form-component" className="flex flex-col items-center justify-center h-screen font-bree" onSubmit={handleSubmit}>
      <div id="form-login" className="flex flex-col items-center justify-center p-[25px] bg-[#bec7ff47] rounded-[48px] w-[616px] h-[500px]">
        
        <div id="title-login" className="text-[#00174b] text-[26px] font-semibold mb-[30px] mt-[-100px] font-[bree-serif]">
          <h2>Iniciar sesión</h2>
        </div>

        <div id="inputs-form" className="mt-[30px]">
          <input id="input-email" type="email" name="email" placeholder="Correo electrónico:" onChange={handleChange} className="size-full p-[18px] border border-[#737373] border-solid rounded-[8px] ml-[32px] mr-[32px] w-[552px] h-[64px] mb-[10px] text-[12px] placeholder-gray-400 font-[bree-serif]" /> {formErrors.email && (<p id="error-email" className="text-red-500 text-sm ml-[32px]">{formErrors.email}</p>)}
          <input id="input-password" type="password" name="password" placeholder="Contraseña:" value={formData.password} onChange={handleChange} className="size-full p-[18px] border border-[#737373] border-solid rounded-[8px] ml-[32px] mr-[32px] w-[552px] h-[64px] mb-[10px] text-[12px] placeholder-gray-400 font-[bree-serif]" /> {formErrors.password && (<p id="error-password" className="text-red-500 text-sm ml-[32px]">{formErrors.password}</p>)}
        </div>
      </div>

      <div id="button-login" className="-mt-[140px] mb-[30px] font-[bree-serif] relative">
        <button id="submit-button" type="submit" disabled={isDisabled} className={`bg-[#00328c] text-white w-[184px] h-[54px] rounded-[32px] text-[22px] border-[none] ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"}`}>Enviar</button>
        <LoginSuccessPopover ref={popoverRef} title="Login exitoso" message="¡Bienvenido/a! Has iniciado sesión correctamente." to="/packages" buttonLabel="Aceptar" />
      </div>

      <div id="changePassword" className="font-[bree-serif] text-[#00174b] text-[14px]">
        <Link to="/changePassword">¿Has olvidado tu contraseña?</Link>
      </div>
    </form>
  );
}
