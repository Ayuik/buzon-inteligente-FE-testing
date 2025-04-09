import { useState } from "react";


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
        <form class="flex flex-col items-center justify-center h-screen" onSubmit = { handleSubmit }>
            <div className = "form-login" class="flex flex-col items-center justify-center p-[25px] bg-[#bec7ff47] rounded-[48px] w-[616px] h-[500px]"> 

                <div className = "title-login" class="text-[#00174b] text-[26px] font-semibold mb-[30px] mt-[-100px] font-[bree-serif]">
                    <h2>Iniciar sesión</h2>
                </div>

                <div className = "inputs-form"class="mt-[30px]">
                    <input type="email" id="email" placeholder="Correo electrónico:" value={formData.email} onChange={handleChange} class="size-full p-[18px] border border-[#737373] border-solid rounded-[8px] ml-[32px] mr-[32px] w-[552px] h-[64px] mb-[30px] text-[12px] placeholder-gray-400 font-[bree-serif]"/>

                    <input type="password" id="password" placeholder="Contraseña:" value={formData.password} onChange={handleChange}  class="size-full p-[18px] border border-[#737373] border-solid rounded-[8px] ml-[32px] mr-[32px] w-[552px] h-[64px] mb-[30px] text-[12px] placeholder-gray-400 font-[bree-serif]"/>
                </div>
            </div> 

            <div className = "button-login" class="-mt-[140px] mb-[30px] font-[bree-serif]">
                <button type="submit" class="bg-[#00328c] text-[#ffffff] w-[184px] h-[54px] m-[center] rounded-[32px] text-[22px] border-[none] cursor-pointer">Enviar</button>
            </div>  
            <div className = "forgot-password" class="font-[bree-serif] text-[#00174b] text-[14px] ">
                <a href="#">¿Olvidaste tu contraseña?</a>  
            </div>    
        </form>
    )
    
}