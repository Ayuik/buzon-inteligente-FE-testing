import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    setErrorMessage("");
    const encodedPassword = btoa(data.password);
    const requestBody = {
      userDni: data.dni,
      userName: data.nombre,
      userSurname: data.apellidos,
      userEmail: data.email,
      userPassword: encodedPassword
    };
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      if (response.status === 201) {
        alert("Registro exitoso.");
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
    <div id="register-form-container" className="form-container flex items-center justify-center bg-white relative font-bree p-8">
      <div
        id="register-form-card"
        className="bg-[#E1E5FF] p-4 rounded-2xl w-full max-w-md shadow-lg border-1 border-gray-300 max-h-[600px] overflow-y-auto">
        <h2 id="form-title" className="text-2xl font-bold text-center text-[#00174B] mb-4 font-bree">Registrarse</h2>
        <form id="register-form" className="space-y-4 w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <input id="input-nombre" type="text" placeholder="Nombre:" {...register('nombre', { required: 'Campo obligatorio' })} className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          <input id="input-apellidos" type="text" placeholder="Apellidos:" {...register('apellidos', { required: 'Campo obligatorio' })} className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          <input id="input-dni" type="text" placeholder="DNI:" {...register('dni', { required: 'Campo obligatorio', pattern: { value: /^\d{8}[A-Za-z]$/, message: 'Formato de DNI no válido (8 cifras y una letra)' } })} className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" /> {errors.dni && <p className="text-red-600 text-sm">{errors.dni.message}</p>}
          <input id="input-email" type="email" placeholder="Correo electrónico:" {...register('email', { required: 'Campo obligatorio', pattern: { value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, message: 'Correo no válido' } })} className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" /> {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          <input id="input-password" type="password" placeholder="Contraseña:" {...register('password', { required: 'Campo obligatorio', minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' } })}  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" /> {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          <input id="input-confirm-password" type="password" placeholder="Confirmar contraseña:" {...register('confirmPassword', { required: 'Campo obligatorio', validate: value => value === watch('password') || 'Las contraseñas no coinciden' })} className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" /> {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
          <div id="submit-button-container" className="send-form-register flex justify-center"> <button id="submit-button" type="submit" className="w-[30%] bg-[#00328C] text-white py-2 rounded-full hover:opacity-90 transition font-bree cursor-pointer"> Enviar </button> </div>
        </form>
        {errorMessage && (
          <p className="text-red-600 text-center mt-4 font-medium">{errorMessage}</p>
        )}
        <p id="login-link-paragraph" className="text-center mt-4 text-sm text-[#00174B]">
          ¿Ya tienes una cuenta? <a id="login-link" href="/login" className="text-blue-600 hover:underline">Iniciar Sesión</a>
        </p>
      </div>
    </div>
  );
}  