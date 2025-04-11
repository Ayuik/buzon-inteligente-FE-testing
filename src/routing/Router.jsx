import { createBrowserRouter } from "react-router-dom";
//import { Layout } from "../Layout";
//import { ExampleRoute } from "./routes/ExampleRoute";
import {PackageDashboardRoute} from "./routes/PackageDashboardRoute";
import { MyAccountRoute } from "./routes/MyAccountRoute";

// TODO: Descomenta los campos y rellenalos con una ruta válida
export const Router = createBrowserRouter(
    [
        {
            path: "/",
            // element: < Layout/>,
            // children: [ExampleRoute]
        },
        {
            path: "/packages",
            // element: < Layout/>,
            children: [PackageDashboardRoute]
        },
        {
            path: "/myaccount",
            // element: < Layout/>,
            children: [MyAccountRoute]
        }

    ],
    { basename: "/" }
)