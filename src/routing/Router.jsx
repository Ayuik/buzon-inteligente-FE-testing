import { createBrowserRouter } from "react-router-dom";
import { PackageDashboardRoute } from "./routes/PackageDashboardRoute";
import { MyAccountRoute } from "./routes/MyAccountRoute";
import { Layout } from "../components/Layouts/Layout";
import { PackageDetailsRoute } from "./routes/PackageDetailsRoute";
import { HomeRoute } from "./routes/HomeRoute";
import { PrivateRoute } from "./routes/utils/PrivateRoute";
import { NotFoundRoute } from "./routes/utils/NotFoundRoute";

export const router = createBrowserRouter(
  [
    NotFoundRoute,
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
