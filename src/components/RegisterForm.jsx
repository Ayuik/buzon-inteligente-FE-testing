import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const popoverRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log('Datos enviados:', data);
    setShowSuccess(true);
    const popover = popoverRef.current;
    if (popover) {
      popover.classList.remove('opacity-0', 'invisible');
      popover.classList.add('opacity-100', 'visible');
    }
  };

  const handleAccept = () => {
    setShowSuccess(false);
    popoverRef.current?.classList.add('opacity-0', 'invisible');
    popoverRef.current?.classList.remove('opacity-100', 'visible');
  };

  return (
    <div id="register-form-container" className="form-container min-h-screen flex items-center justify-center bg-white relative font-bree">
      <div id="register-form-card" className="bg-[#E1E5FF] p-4 rounded-2xl w-full max-w-md shadow-lg border-1 border-gray-300">
        <h2 id="form-title" className="text-2xl font-bold text-center text-[#00174B] mb-6 font-bree">Registrarse</h2>
        <form id="register-form" className="space-y-6 w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <input
            id="input-nombre"
            type="text"
            placeholder="Nombre:"
            {...register('nombre', { required: 'Campo obligatorio' })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          <input
            id="input-apellidos"
            type="text"
            placeholder="Apellidos:"
            {...register('apellidos', { required: 'Campo obligatorio' })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          <input
            id="input-dni"
            type="text"
            placeholder="DNI:"
            {...register('dni', {
              required: 'Campo obligatorio',
              pattern: {
                value: /^\d{8}[A-Za-z]$/,
                message: 'Formato de DNI no válido (8 cifras y una letra)',
              },
            })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          {errors.dni && <p id="error-dni" className="text-red-600 text-sm">{errors.dni.message}</p>}
          <input
            id="input-email"
            type="email"
            placeholder="Correo electrónico:"
            {...register('email', {
              required: 'Campo obligatorio',
              pattern: {
                value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                message: 'Correo no válido',
              },
            })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          {errors.email && <p id="error-email" className="text-red-600 text-sm">{errors.email.message}</p>}
          <input
            id="input-password"
            type="password"
            placeholder="Contraseña:"
            {...register('password', {
              required: 'Campo obligatorio',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          {errors.password && (
            <p id="error-password" className="text-red-600 text-sm">{errors.password.message}</p>
          )}
          <input
            id="input-confirm-password"
            type="password"
            placeholder="Confirmar contraseña:"
            {...register('confirmPassword', {
              required: 'Campo obligatorio',
              validate: value => value === watch('password') || 'Las contraseñas no coinciden',
            })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2" />
          {errors.confirmPassword && (
            <p id="error-confirm-password" className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
          )}
          <div id="submit-button-container" className="send-form-register flex justify-center">
            <button
              id="submit-button"
              type="submit"
              className="w-[30%] bg-[#00328C] text-white py-2 rounded-full hover:opacity-90 transition font-bree">
              Enviar
            </button>
          </div>
        </form>
        <p id="login-link-paragraph" className="text-center mt-4 text-sm text-[#00174B]">
          ¿Ya tienes una cuenta?{' '}
          <a id="login-link" href="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>

      {showSuccess && (
        <div
        id="success-popover"
        ref={popoverRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 inline-block w-[90%] max-w-sm text-sm text-[#00174B] transition-opacity duration-300 bg-[#E1E5FF] border border-[#00174B] rounded-lg shadow-lg opacity-0 invisible">
        <div id="success-popover-header" className="px-4 py-3 border-b border-[#00174B] rounded-t-lg">
          <h3 id="success-message-title" className="font-semibold text-center text-lg">
            Registro completado. Ya puedes iniciar sesión.
          </h3>
        </div>
        <div id="success-popover-body" className="px-4 py-2 text-center">
        
          <Link to="/login" >
          <button
            id="success-accept-button"
            onClick={handleAccept}
            className="bg-[#00174B] hover:opacity-90 text-white px-4 py-2 rounded-md mt-2">
            Aceptar
          </button> 
          </Link>

        </div>
      </div>
      )}
    </div>
  );
};

