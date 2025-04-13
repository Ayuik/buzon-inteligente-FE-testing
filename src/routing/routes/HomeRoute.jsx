import { HomeView } from "../../views/HomeView";
import { RegisterForm } from "../../components/RegisterForm";

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
    ]
}  