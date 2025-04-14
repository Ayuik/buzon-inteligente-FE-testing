import { useState } from "react";
import { login as loginService } from "../services/AuthService";

export function useLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPopover, setShowPopover] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");

    if (!formErrors.email && !formErrors.password) {
      try {
        const { token } = await loginService(formData.email, formData.password);
        localStorage.setItem("token", token);
        setShowPopover(true);
      } catch (err) {
        setLoginError("No se ha podido conectar con el servidor.");
      }
    }
  };

  const isDisabled =
    !formData.email ||
    !formData.password ||
    formErrors.email ||
    formErrors.password;

  return {
    formData,
    formErrors,
    loginError,
    handleChange,
    handleSubmit,
    isDisabled,
    showPopover,
    setShowPopover,
  };
}
