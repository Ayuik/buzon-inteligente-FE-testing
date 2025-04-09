import { useState } from "react";
import "./FormularioRegistro.css";

export function FormularioRegistro() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    id: "",
    permanentKey: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-register">
        <div className="title_form">
          <h2>Registrarse</h2>
        </div>
        <div className="inputs-form">
          <input type="text" id="name" placeholder="Nombre:" value={formData.name} onChange={handleChange} />
          <input type="text" id="surname" placeholder="Apellidos:" value={formData.surname} onChange={handleChange} />
          <input type="text" id="id" placeholder="DNI:" value={formData.id} onChange={handleChange} />
          <input type="text" id="permanent key" placeholder="Clave permanente:" value={formData.permanentKey} onChange={handleChange} />
          <input type="text" id="email" placeholder="Correo electrónico:" value={formData.email} onChange={handleChange} />
          <input type="text" id="password" placeholder="Contraseña:" value={formData.password} onChange={handleChange} />
          <input type="text" id="confirm password" placeholder="Confirmar contraseña:" value={formData.confirmPassword} onChange={handleChange} />
        </div>
      </div>
      <div className="container-send">
        <div className="button-send">
          <button type="submit">Enviar</button>
        </div>
        <div className="init_sesion">
          <a>¿Ya tienes una?</a> <a href="#">Inicia sesión</a>
        </div>
      </div>
    </form>
  )

}
