import React from 'react';
import { useForm } from 'react-hook-form';

export const FormularioRegistro = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    console.log('Datos enviados:', data);
  };
  return (
    <div className="form-container min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#E1E5FF] p-4 rounded-2xl w-full max-w-md shadow-lg border-1  border-gray-300">
        <h2 className="text-2xl font-bold text-center text-[#00174B] mb-6 font-bree">Registrarse</h2>
        <form className="space-y-6 w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>   
          <input
            type="text"
            placeholder="Nombre:"
            {...register('dni', { required: 'Campo obligatorio' })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2 "
          />
          <input
            type="text"
            placeholder="Apellidos:"
            {...register('dni', { required: 'Campo obligatorio' })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2 "
          />
          <input
            type="text"
            placeholder="DNI:"
            {...register('dni', { required: 'Campo obligatorio' })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2 "
          />
          {errors.dni && <p className="text-red-600 text-sm">{errors.dni.message}</p>}
          <input
            type="email"
            placeholder="Correo electrónico:"
            {...register('email', {
              required: 'Campo obligatorio',
              pattern: {
                value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                message: 'Correo no válido',
              },
            })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2 "
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Contraseña:"
            {...register('password', { required: 'Campo obligatorio', minLength: 6 })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2 "
          />
          {errors.password && (
            <p className="text-red-600 text-sm">La contraseña debe tener al menos 6 caracteres</p>
          )}
          <input
            type="password"
            placeholder="Confirmar contraseña:"
            {...register('confirmPassword', {
              required: 'Campo obligatorio',
              validate: value => value === watch('password') || 'Las contraseñas no coinciden',
            })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#EEF0FF] text-[#00174B] focus:outline-none focus:ring-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
          )}
          <div className="send-form-register flex justify-center">
            <button
              type="submit"
              className="w-[30%] bg-[#00328C] text-white py-2 rounded-full hover:opacity-90 transition font-bree">
              Enviar
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-[#00174B]">
          ¿Ya tienes una cuenta?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
};