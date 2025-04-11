import ProfileField from "./ProfileField";
import Button from "../Button";
import { useState } from "react";

export const ProfileCard = () => {
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John',
        surname: 'Doe',
        dni: '12345678F',
        email: 'johndoe@gmail.com',
        password: '12345678',
        credential: '1234567ASD'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => setEditable(true);
    const handleCancel = () => setEditable(false);
    const handleSave = () => {
        // aqui iría el PUT a la API
        setEditable(false);
    };

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
            <ProfileField label="Nombre:" value={formData.name} editable={editable} onChange={handleChange} name="name" />
            <ProfileField label="Apellidos:" value={formData.surname} editable={editable} onChange={handleChange} name="surname" />
            <ProfileField label="DNI:" value={formData.dni} editable={editable} onChange={handleChange} name="dni" />
            <ProfileField label="Correo Electrónico:" value={formData.email} editable={editable} onChange={handleChange} name="email" />
            <ProfileField label="Contraseña:" value={formData.password} editable={editable} onChange={handleChange} name="password" />
            <ProfileField label="Credencial Permanente:" value={formData.credential} editable={false} />

            <div className="flex justify-end space-x-2 mt-4">
                {editable ? (
                    <>
                        <Button text="Guardar cambios" onClick={handleSave} />
                        <Button text="Cancelar" onClick={handleCancel}/>
                    </>
                ) : (
                    <Button text="Editar" onClick={handleEdit} />
                )}
            </div>
        </div>
    );
};