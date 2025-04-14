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

  const [credentialGenerated, setCredentialGenerated] = useState(!!formData.credential);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditable(true);
  const handleCancel = () => {
    setFormData((prev) => ({ ...prev, password:"", confirmPassword: "" }));
    setEditable(false);
  };
  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
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
      />
      <ProfileField
        label="Apellidos:"
        value={formData.surname}
        editable={editable}
        onChange={handleChange}
        name="surname"
      />
      <ProfileField
        label="DNI:"
        value={formData.dni}
        editable={editable}
        onChange={handleChange}
        name="dni"
      />
      <ProfileField
        label="Correo Electrónico:"
        value={formData.email}
        editable={editable}
        onChange={handleChange}
        name="email"
      />
      <ProfileField
        label="Contraseña:"
        value={formData.password}
        editable={editable}
        onChange={handleChange}
        name="password"
      />
      {editable && formData.password && (
      <ProfileField
        label="Confirmar contraseña:"
        value={formData.confirmPassword}
        editable={editable}
        onChange={handleChange}
        name="confirmPassword"
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
