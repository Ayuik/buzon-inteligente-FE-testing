import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RegisterForm } from "../src/components/RegisterForm";  
import { MemoryRouter } from "react-router-dom";

describe("Formulario de registro", () => {
  it("debería renderizar los campos del formulario", () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText("Nombre:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Apellidos:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("DNI:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar contraseña:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("debería mostrar errores si se envía el formulario vacío", async () => {
    render(<RegisterForm />);
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    const errores = await screen.findAllByText("Campo obligatorio");
    expect(errores.length).toBeGreaterThan(0);
  });

  it("debería mostrar error si las contraseñas no coinciden", async () => {
    render(<RegisterForm />);

    await userEvent.type(screen.getByPlaceholderText("Contraseña:"), "123456");
    await userEvent.type(screen.getByPlaceholderText("Confirmar contraseña:"), "diferente");

    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText("Las contraseñas no coinciden")).toBeInTheDocument();
  });

  it("debería enviar los datos correctamente si todo es válido", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText("Nombre:"), "Juan");
    await userEvent.type(screen.getByPlaceholderText("Apellidos:"), "Pérez");
    await userEvent.type(screen.getByPlaceholderText("DNI:"), "12345678X");
    await userEvent.type(screen.getByPlaceholderText("Correo electrónico:"), "juan@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Contraseña:"), "password123");
    await userEvent.type(screen.getByPlaceholderText("Confirmar contraseña:"), "password123");

    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(spy).toHaveBeenCalledWith("Datos enviados:", {
      nombre: "Juan",
      apellidos: "Pérez",
      dni: "12345678X",
      email: "juan@mail.com",
      password: "password123",
      confirmPassword: "password123",
    });

    spy.mockRestore();
  });
});
