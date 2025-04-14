import { HomeView } from "../../views/HomeView";
import { RegisterForm } from "../../components/RegisterForm";
{/* TODO: include login form import */}

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
/*      TODO: discomment this to include login form
        {
            path: "login",
            element: <LoginForm />
        }, 
*/
    ]
}  