import { Link } from "react-router-dom";
import { LoginSuccessPopover } from "../LoginSuccessPopover";
import { useLogin } from "../useLogin";

export function LoginForm() {
    const {
        formData,
        handleChange,
        handleSubmit,
        formErrors,
        isDisabled,
        loginError,
        showPopover,
        setShowPopover,
    } = useLogin();

    return (
        <form
            id="form-component"
            className="flex flex-col items-center justify-center min-h-screen px-4 font-bree"
            onSubmit={handleSubmit}
        >
            <div
                id="form-login"
                className="flex flex-col items-center justify-center bg-[#bec7ff47] rounded-3xl w-full max-w-md min-w-[28rem] py-10 px-6"
            >
                <div
                    id="title-login"
                    className="text-[#00174b] text-2xl font-semibold mb-6"
                >
                    <h2>Iniciar sesión</h2>
                </div>

                <div id="inputs-form" className="w-full space-y-4">
                    <input
                        id="input-email"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico:"
                        onChange={handleChange}
                        className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
                    />
                    {formErrors.email && (
                        <p id="error-email" className="text-red-500 text-sm">
                            {formErrors.email}
                        </p>
                    )}

                    <input
                        id="input-password"
                        type="password"
                        name="password"
                        placeholder="Contraseña:"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-[#737373] rounded-md text-sm placeholder-gray-400"
                    />
                    {formErrors.password && (
                        <p id="error-password" className="text-red-500 text-sm">
                            {formErrors.password}
                        </p>
                    )}

                    {loginError && (
                        <p id="login-error" className="text-red-600 text-sm">
                            {loginError}
                        </p>
                    )}
                    <div
                        id="button-login"
                        className="mt-6 mb-4 font-bree relative w-full max-w-md flex justify-center"
                    >
                        <button
                            id="submit-button"
                            type="submit"
                            disabled={isDisabled}
                            className={`w-2/3 max-w-xs py-3 rounded-full text-lg text-white ${isDisabled
                                    ? "bg-[#00328c] opacity-50 cursor-not-allowed"
                                    : "bg-[#00328c] hover:opacity-90 cursor-pointer"
                                }`}
                        >
                            Enviar
                        </button>
                    </div>

                    <div id="register-link" className="flex justify-center gap-1 font-bree text-[#00174b] text-sm mt-2">
                        ¿Aún no tienes cuenta?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Regístrate
                        </Link>
                    </div>

                    {showPopover && (
                        <LoginSuccessPopover
                            title="Login exitoso"
                            message="¡Bienvenido/a! Has iniciado sesión correctamente."
                            to="/packages"
                            buttonLabel="Aceptar"
                            onAccept={() => setShowPopover(false)}
                        />
                    )}
                </div>
            </div>
        </form>
    );
}
