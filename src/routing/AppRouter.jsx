import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { AuthProvider } from "../context/AuthProvider";
import { ProfileProvider } from "../context/ProfileProvider";

export const AppRouter = () => {
  return(
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  ) 
};
