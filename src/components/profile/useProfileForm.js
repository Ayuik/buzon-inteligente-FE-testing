import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../services/ProfileService";
import { useAuth } from "../../context/AuthProvider";

export const useProfileForm = () => {
  const { credential, userId } = useAuth();
  const token = localStorage.getItem("token");

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    credential: credential || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token || !userId) return;
        const user = await getUserProfile(userId, token);
        setFormData((prev) => ({
          ...prev,
          name: user.userName || "",
          surname: user.userSurname || "",
          dni: user.userDni || "",
          email: user.userEmail || "",
          credential: user.permanentCredential || "",
        }));
      } catch (error) {
        console.error("Error al obtener el perfil", error);
      }
    };

      fetchProfile();
    }, [token, userId]);

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setEditable(true);

  const handleCancel = () => {
    setFormData((prev) => ({ ...prev, password:"", confirmPassword: "" }));
    setErrors({});
    setEditable(false);
  };
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const dataToSend = {
        userName: formData.name,
        userSurname: formData.surname,
        userDni: formData.dni,
        userEmail: formData.email,
        ...(formData.password ? { userPassword: encodeBase64(formData.password) } : {}),
      };

      await updateUserProfile(userId, dataToSend, token);
      alert("Perfil actualizado correctamente.");
      setEditable(false);
    } catch (error) {
      console.error("Error al guardar", error);
      alert("No se pudo guardar el perfil. Inténtalo de nuevo más tarde.");
    }
  };

  return {
    editable,
    formData,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSave,
    };
  };