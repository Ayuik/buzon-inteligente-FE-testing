import { ProfileField } from "./ProfileField";
import { Button } from "./Button";
import { useState } from "react";

export const ProfileCard = () => {
  const [editable, setEditable] = useState(false);
  // Datos de ejemplo - llamada a la API
  const [formData, setFormData] = useState({
    name: "Paco",
    surname: "Porras Pérez",
    dni: "12345678F",
    email: "paquitopp@gmail.com",
    password: "**********",
    confirmPassword: "",
    credential: "",
  });

  const [errors, setErrors] = useState({});
  const [credentialGenerated, setCredentialGenerated] = useState(!!formData.credential);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.surname.trim()) newErrors.surname = "Los apellidos son obligatorios.";
    if (!formData.dni.trim()) newErrors.dni = "El DNI es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => setEditable(true);
  const handleCancel = () => {
    setFormData((prev) => ({ ...prev, password:"", confirmPassword: "" }));
    setErrors({});
    setEditable(false);
  };
  const handleSave = () => {
    if (!validateForm()) return;
    // aqui iría el PUT a la API
    alert("Datos guardados correctamente");
    setEditable(false);
  };

  const handleGenerateCredential = () => {
    // aqui iría la llamada a la API para generar la credencial
    const fakecredential = "1234567890";
    setFormData((prev) => ({ ...prev, credential: fakecredential }));
    setCredentialGenerated(true);
  }

  return (
    <div className="bg-[rgba(190,199,255,0.28)] p-6 rounded-[48px] shadow-md max-w-md mx-auto mt-10 mb-10 font-bree sm:p-12 space-y-10 ">
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
        value={formData.password}
        editable={editable}
        onChange={handleChange}
        name="password"
        error={errors.password}
      />
      {editable && formData.password && (
      <ProfileField
        label="Confirmar contraseña:"
        value={formData.confirmPassword}
        editable={editable}
        onChange={handleChange}
        name="confirmPassword"
        error={errors.confirmPassword}
      />
      )}
      <ProfileField
        label="Credencial Permanente:"
        value={formData.credential}
        editable={false}
      />
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
