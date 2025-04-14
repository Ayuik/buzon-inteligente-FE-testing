import { ProfileField } from "./ProfileField";
import { Button } from "./Button";
import { useProfileForm } from "./useProfileForm";

export const ProfileCard = () => {
  const {
    editable,
    formData,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleGenerateCredential,
  } = useProfileForm();

  return (
<div className="bg-[rgba(190,199,255,0.28)] p-6 rounded-[48px] shadow-md max-w-md mx-auto mt-10 mb-10 font-bree sm:p-12 space-y-10 ">
      <ProfileField label="Nombre:" value={formData.name} editable={editable} onChange={handleChange} name="name" error={errors.name} />
      <ProfileField label="Apellidos:" value={formData.surname} editable={editable} onChange={handleChange} name="surname" error={errors.surname} />
      <ProfileField label="DNI:" value={formData.dni} editable={editable} onChange={handleChange} name="dni" error={errors.dni} />
      <ProfileField label="Correo Electrónico:" value={formData.email} editable={editable} onChange={handleChange} name="email" error={errors.email} />
      <ProfileField label="Contraseña:" value={formData.password} editable={editable} onChange={handleChange} name="password" error={errors.password} />
      {editable && formData.password && (
        <ProfileField label="Confirmar contraseña:" value={formData.confirmPassword} editable={editable} onChange={handleChange} name="confirmPassword" error={errors.confirmPassword} />
      )}
      <ProfileField label="Credencial Permanente:" value={formData.credential} editable={false} />
      {!formData.credential && !editable && (
        <div className="flex justify-start">
          <Button text="Generar credencial" onClick={handleGenerateCredential} />
        </div>
      )}
      <div className="flex justify-end space-x-2 mt-4">
        {editable ? (
          <>
            <Button text="Guardar cambios" onClick={handleSave} />
            <Button text="Cancelar" onClick={handleCancel} />
          </>
        ) : (
          <Button text="Editar datos" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
};
