import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
