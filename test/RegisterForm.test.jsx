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

  it("debería ejecutar onSubmit y mostrar el popover", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  
    await userEvent.type(screen.getByPlaceholderText("Nombre:"), "Ana");
    await userEvent.type(screen.getByPlaceholderText("Apellidos:"), "Martínez");
    await userEvent.type(screen.getByPlaceholderText("DNI:"), "87654321Z");
    await userEvent.type(screen.getByPlaceholderText("Correo electrónico:"), "ana@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Contraseña:"), "passwordAna");
    await userEvent.type(screen.getByPlaceholderText("Confirmar contraseña:"), "passwordAna");
  
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
  
    const popover = await screen.findByTestId("success-popover");
  
    const addMock = vi.fn();
    const removeMock = vi.fn();
    popover.classList.add = addMock;
    popover.classList.remove = removeMock;
  
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
  
    expect(removeMock).toHaveBeenCalledWith("opacity-0", "invisible");
    expect(addMock).toHaveBeenCalledWith("opacity-100", "visible");
  });


  it("debería ocultar el popover al hacer clic en aceptar", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  
    await userEvent.type(screen.getByPlaceholderText("Nombre:"), "Ana");
    await userEvent.type(screen.getByPlaceholderText("Apellidos:"), "García");
    await userEvent.type(screen.getByPlaceholderText("DNI:"), "87654321Z");
    await userEvent.type(screen.getByPlaceholderText("Correo electrónico:"), "ana@mail.com");
    await userEvent.type(screen.getByPlaceholderText("Contraseña:"), "miClaveSegura123");
    await userEvent.type(screen.getByPlaceholderText("Confirmar contraseña:"), "miClaveSegura123");
    await userEvent.click(screen.getByRole("button", { name: /enviar/i }));
  
    const mensajePopover = await screen.findByText(/Registro completado/i);
    expect(mensajePopover).toBeInTheDocument();
  
    const botonAceptar = screen.getByRole("button", { name: /aceptar/i });
    await userEvent.click(botonAceptar);
  
    expect(screen.queryByText(/Registro completado/i)).not.toBeInTheDocument();
  });
});
