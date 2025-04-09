import { createBrowserRouter } from "react-router-dom";
//import { Layout } from "../Layout";
//import { ExampleRoute } from "./routes/ExampleRoute";
import {PackageDashboardRoute} from "./routes/PackageDashboardRoute";

// TODO: Descomenta los campos y rellenalos con una ruta válida
export const router = createBrowserRouter(
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
    ],
    { basename: "/" }
)