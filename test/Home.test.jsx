import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Home } from "../src/components/home/Home"; 
import { Footer } from "../src/components/Footer"; 

describe("Home component", () => {
  it(() => {
    render(<Home />);
    
    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    const registerButton = screen.getByRole("button", { name: /Registrarse/i });
    
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});