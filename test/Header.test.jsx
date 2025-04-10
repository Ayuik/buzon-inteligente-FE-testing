import { fireEvent, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "../src/components/navbar";
import { renderWithRouter } from "./utilsTest";

describe("Navbar", () => {
  it("debería mostrar el logo", () => {
    renderWithRouter(<Navbar />, { route: "/" });
    const logo = screen.getByAltText("Eureka logo");
    expect(logo).toBeInTheDocument();
  });

  it("no debería mostrar el menú si está en '/'", () => {
    renderWithRouter(<Navbar />, { route: "/" });
    expect(screen.queryByText("Mis paquetes")).not.toBeInTheDocument();
  });

  it("debería mostrar el menú si NO está en '/'", () => {
    renderWithRouter(<Navbar />, { route: "/mi-cuenta" });

    const desktopMenu = screen.getByRole("navigation");
    const menuItem = within(desktopMenu).getByText("Mis paquetes");

    expect(menuItem).toBeInTheDocument();
  });

  it("debería mostrar el menú móvil al hacer clic en el botón", () => {
    renderWithRouter(<Navbar />, { route: "/mi-cuenta" });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const mobileMenu = screen.getByTestId("mobile-menu");
    const menuItem = within(mobileMenu).getByText("Mis paquetes");

    expect(menuItem).toBeInTheDocument();
  });
  
    it("debería cerrar el menú móvil al hacer clic en 'Mis paquetes'", () => {
      renderWithRouter(<Navbar />, { route: "/mi-cuenta" });
  
      const button = screen.getByRole("button");
      fireEvent.click(button);
  
      const mobileMenu = screen.getByTestId("mobile-menu");
      const menuItem = within(mobileMenu).getByText("Mis paquetes");
      fireEvent.click(menuItem);
  
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });

  it("debería cerrar el menú móvil al hacer clic en 'Mis notificaciones'", () => {
    renderWithRouter(<Navbar />, { route: "/mi-cuenta" });
  
    const button = screen.getByRole("button");
    fireEvent.click(button);
  
    const mobileMenu = screen.getByTestId("mobile-menu");
    const notificaciones = within(mobileMenu).getByText("Mis notificaciones");
    fireEvent.click(notificaciones);
  
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
  
  it("debería cerrar el menú móvil al hacer clic en 'Mi cuenta'", () => {
    renderWithRouter(<Navbar />, { route: "/mi-cuenta" });
  
    const button = screen.getByRole("button");
    fireEvent.click(button);
  
    const mobileMenu = screen.getByTestId("mobile-menu");
    const miCuenta = within(mobileMenu).getByText("Mi cuenta");
    fireEvent.click(miCuenta);
  
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
  
  it("debería cerrar el menú móvil al hacer clic en 'Cerrar sesión'", () => {
    renderWithRouter(<Navbar />, { route: "/mi-cuenta" });
  
    const button = screen.getByRole("button");
    fireEvent.click(button);
  
    const mobileMenu = screen.getByTestId("mobile-menu");
    const cerrarSesion = within(mobileMenu).getByText("Cerrar sesión");
    fireEvent.click(cerrarSesion);
  
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});