import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { describe, it, vi, beforeEach } from "vitest";
import { HomeView } from "../src/views/HomeView";

vi.mock("../src/components/home/Home", () => ({
  Home: vi.fn(({ onLoginClick, onRegisterClick }) => (
    <div>
      Mocked Home Component
      <button onClick={onLoginClick}>Iniciar sesión</button>
      <button onClick={onRegisterClick}>Registrarse</button>
    </div>
  )),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (initialRoute = "/") =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </MemoryRouter>
  );

describe("HomeView", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("muestra la imagen y el componente Home", () => {
    renderWithRouter();
    const homeImage = document.getElementById("img-home");

    expect(screen.getByAltText("")).toBeInTheDocument();
    expect(homeImage).toHaveAttribute("src", expect.stringContaining("/img/Captura.PNG"));
    expect(screen.getByText("Mocked Home Component")).toBeInTheDocument();
  });

  it("renderiza Home solo en la ruta correcta", () => {
    renderWithRouter();
    expect(screen.getByText("Mocked Home Component")).toBeInTheDocument();
  });

  it("no renderiza Home en una ruta incorrecta", () => {
    renderWithRouter("/testroute");
    expect(screen.queryByText("Mocked Home Component")).not.toBeInTheDocument();
  });

  it("click en 'Iniciar sesión' navega a /login", async () => {
    renderWithRouter();
    await userEvent.click(screen.getByText("Iniciar sesión"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("click en 'Registrarse' navega a /register", async () => {
    renderWithRouter();
    await userEvent.click(screen.getByText("Registrarse"));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});