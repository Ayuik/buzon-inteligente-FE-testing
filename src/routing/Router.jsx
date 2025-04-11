import { createBrowserRouter } from "react-router-dom";
//import { ExampleRoute } from "./routes/ExampleRoute";
import {PackageDashboardRoute} from "./routes/PackageDashboardRoute";
import { Layout } from "../components/Layouts/Layout";
import { PackageDetailsRoute } from "./routes/PackageDetailsRoute";
import { RegisterRoute } from "./routes/RegisterRoute";

// TODO: Descomenta los campos y rellenalos con una ruta válida
export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: < Layout/>,
            children: [RegisterRoute]
        },
        {
            path: "/packages",
            element: < Layout/>,
            children: [PackageDashboardRoute, PackageDetailsRoute]
        },
    ],
    { basename: "/" }
)