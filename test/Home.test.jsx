import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Home } from "../src/components/home/Home"; 


describe("Home component", () => {
  it("should render both buttons with correct text", () => {
    render(<Home />);

    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    const registerButton = screen.getByRole("button", { name: /Registrarse/i });

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});