import { HomeView } from "../../views/HomeView";
import { RegisterForm } from "../../components/RegisterForm";
import { LoginForm } from "../../components/loginForm/LoginForm";

export const HomeRoute = {
    path: "/",
    element: <HomeView />,
    children: [
        {
            index: true,
            element: null,
        },
        {
            path: "register",
            element: <RegisterForm />
        },

        {
            path: "login",
            element: <LoginForm />
        }, 

    ]
}  