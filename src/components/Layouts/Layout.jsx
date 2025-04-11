import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
