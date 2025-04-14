import { useState } from "react";

export const useProfileForm = () => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dni: "",
    email: "",
    password: "",
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
      if (formData.password.length < 8) {
        newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
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

  return {
    editable,
    formData,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    handleGenerateCredential,
    credentialGenerated,
    };
  };