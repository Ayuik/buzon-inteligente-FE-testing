import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Home } from "../src/components/home/Home"; 

describe("Home component", () => {
  it("los botones existen", () => {
    render(<Home />);
    
    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    const registerButton = screen.getByRole("button", { name: /Registrarse/i });
    
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("funcionalidad de los botones", () => {
    const onLoginClick = vi.fn();
    const onRegisterClick = vi.fn();

    render(<Home onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />);

    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    const registerButton = screen.getByRole("button", { name: /Registrarse/i });

    loginButton.click();
    registerButton.click();

    expect(onLoginClick).toHaveBeenCalledTimes(1);
    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});