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
  } = useProfileForm();

  return (
    <div className="md:bg-[rgba(190,199,255,0.28)] p-[1.5rem] rounded-[3rem] md:shadow-md max-w-md mx-auto mt-[2.5rem] font-bree sm:p-[3rem] space-y-[2.5rem]">
      <ProfileField
        label="Nombre:"
        value={formData.name}
        editable={editable}
        onChange={handleChange}
        name="name"
        error={errors.name}
      />
      <ProfileField
        label="Apellidos:"
        value={formData.surname}
        editable={editable}
        onChange={handleChange}
        name="surname"
        error={errors.surname}
      />
      <ProfileField
        label="DNI:"
        value={formData.dni}
        editable={editable}
        onChange={handleChange}
        name="dni"
        error={errors.dni}
      />
      <ProfileField
        label="Correo Electrónico:"
        value={formData.email}
        editable={editable}
        onChange={handleChange}
        name="email"
        error={errors.email}
      />
      <ProfileField
        label="Contraseña:"
        value={formData.Password}
        editable={editable}
        onChange={handleChange}
        name="Password"
        error={errors.Password}
        type="password"
      />
      <ProfileField
        label="Confirmar contraseña:"
        value={formData.confirmPassword}
        editable={editable}
        onChange={handleChange}
        name="confirmPassword"
        error={errors.confirmPassword}
        type="password"
      />
      <ProfileField
        label="Credencial Permanente:"
        value={formData.credential}
        editable={false}
      />
      <div className="flex justify-center gap-[0.5rem] mt-[1rem]">
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
