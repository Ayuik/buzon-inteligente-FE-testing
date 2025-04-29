import { createBrowserRouter } from "react-router-dom";
//import { ExampleRoute } from "./routes/ExampleRoute";
import { PackageDashboardRoute } from "./routes/PackageDashboardRoute";
import { MyAccountRoute } from "./routes/MyAccountRoute";
import { Layout } from "../components/Layouts/Layout";
import { PackageDetailsRoute } from "./routes/PackageDetailsRoute";
import { HomeRoute } from "./routes/HomeRoute";
import { PrivateRoute } from "./routes/utils/PrivateRoute";

// TODO: Descomenta los campos y rellenalos con una ruta válida
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        HomeRoute,
        {
          path: "user/",

          element: <PrivateRoute />,

          children: [PackageDashboardRoute, PackageDetailsRoute, MyAccountRoute],
        },
      ],
    },
  ],
);
