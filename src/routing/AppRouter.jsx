import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { AuthProvider } from "../context/AuthProvider";

export const AppRouter = () => {
  return(
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  ) 
};
