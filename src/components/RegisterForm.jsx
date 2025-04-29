import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessModal } from "./SuccessModal";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setErrorMessage("");
    const encodedPassword = btoa(data.password);
    const requestBody = {
      userDni: data.dni,
      userName: data.nombre,
      userSurname: data.apellidos,
      userEmail: data.email,
      userPassword: encodedPassword,
    };
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (response.status === 201) {
        setShowPopover(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      setErrorMessage("No se ha podido conectar con el servidor.");
      console.error("Error:", error);
    }
  };
  return (
    <form
      id="register-form"
      className="bg-[#bec7ff47] flex flex-col items-center justify-center h-full w-full font-bree lg:h-auto gap-5 p-8 lg:rounded-3xl lg:mx-auto lg:max-w-[28rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        id="title-register"
        className="text-[#00174b] text-2xl font-semibold"
      >
        <h1 id="form-title">Registrarse</h1>
      </div>
      <div className="w-full space-y-4">
        <input
          id="input-name"
          type="text"
          placeholder="Nombre:"
          {...register("nombre", { required: "Required field" })}
          className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm"> {errors.nombre.message}</p>
        )}
        <input
          id="input-apellidos"
          type="text"
          placeholder="Apellidos:"
          {...register("apellidos", { required: "Required field" })}
          className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
        />
        {errors.apellidos && (
          <p className="text-red-500 text-sm"> {errors.apellidos.message}</p>
        )}
        <input
          id="input-dni"
          type="text"
          placeholder="DNI:"
          {...register("dni", {
            required: "Required field",
            pattern: {
              value: /^\d{8}[A-Za-z]$/,
              message: "Formato de DNI no válido (8 cifras y una letra)",
            },
          })}
          className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
        />
        {errors.dni && (
          <p className="text-red-500 text-sm"> {errors.dni.message}</p>
        )}
        <input
          id="input-email"
          type="email"
          placeholder="Correo electrónico:"
          {...register("email", {
            required: "Required field",
            pattern: {
              value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
              message: "Correo no válido",
            },
          })}
          className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm"> {errors.email.message}</p>
        )}
        <input
          id="input-password"
          type="password"
          placeholder="Contraseña:"
          {...register("password", {
            required: "Required field",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
          className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm"> {errors.password.message}</p>
        )}
        <input
          id="input-confirm-password"
          type="password"
          placeholder="Confirmar contraseña:"
          {...register("confirmPassword", {
            required: "Required field",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
          className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {" "}
            {errors.confirmPassword.message}
          </p>
        )}
        <div
          id="submit-button-container"
          className="mt-6 mb-4 relative flex justify-center"
        >
          <button
            id="submit-button"
            type="submit"
            className="w-2/3 max-w-xs py-3 rounded-full text-lg text-white bg-[#00328c] hover:opacity-90 cursor-pointer"
          >
            Enviar
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div
          id="register-link"
          className="flex flex-col justify-center text-center gap-1 text-[#00174b] text-sm mt-2 lg:flex-row"
        >
          ¿Ya tienes una cuenta?
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </div>
        {showPopover && (
          <SuccessModal
            title="¡Registro completado!"
            message="Ya puedes iniciar sesión"
            to="/login"
            buttonLabel="Aceptar"
            onAccept={() => setShowPopover(false)}
          />
        )}
      </div>
    </form>
  );
};
