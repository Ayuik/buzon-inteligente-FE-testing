import { useState } from "react";
import "./loginForm.css"

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }


    
    return (
        <form onSubmit = { handleSubmit }>
            <div className = "form-login">
                <div className = "title-login">
                    <h2>Iniciar sesión</h2>
                </div>
                <div className = "inputs-form">
                <input type="email" id="email" placeholder="Correo electrónico:" value={formData.email} onChange={handleChange}/>
                <input type="password" id="password" placeholder="Contraseña:" value={formData.password} onChange={handleChange} />
                </div>
            </div>    
            <div className = "button-login">
                <button type="submit">Enviar</button>
            </div>  
            <div className = "forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>  
            </div>    
        </form>
    )
    
}