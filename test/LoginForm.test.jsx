import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "../src/components/loginForm/loginForm";
import { renderWithRouter } from "./utilsTest";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  let submitButton;
  let emailInput;
  let passwordInput;
  let validEmail;

  beforeEach(() => {
    renderWithRouter(<LoginForm />);
    submitButton = screen.getByRole("button", { name: /enviar/i });
    emailInput = screen.getByPlaceholderText("Correo electrónico:");
    passwordInput = screen.getByPlaceholderText("Contraseña:");
    validEmail = "test@example.com";
  });

  it("debería renderizar el formulario de inicio de sesión correctamente", () => {
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /regístrate/i })).toBeInTheDocument();
  });
  it("debería renderizar errores de validación si el email no cumple el formato", async () => {
    expect(screen.queryByText("Correo inválido")).not.toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("Correo electrónico:"),
      "123"
    );

    expect(await screen.findByText("Correo inválido")).toBeInTheDocument();
  });
  it("debería renderizar errores de validación si la contraseña está vacía", async () => {
    expect(
      screen.queryByText("La contraseña es obligatoria")
    ).not.toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText("Contraseña:"), " ");

    expect(
      await screen.findByText("La contraseña es obligatoria")
    ).toBeInTheDocument();
  });
  it("el botón de entrega debería estar desahabilitado si hay campos sin rellenar", async () => {
    expect(submitButton).toBeDisabled();

    await userEvent.type(emailInput, "123");

    expect(submitButton).toBeDisabled();

    expect(passwordInput).toBeEmptyDOMElement();
  });
  it("el botón de entrega debería estar deshabilitado cuando uno de campos contiene errores", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, " ");

    expect(submitButton).toBeDisabled();
  });
  it("el botón de entrega debería estar habilitado si todos los campos son válidos", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, "1234");

    expect(submitButton).toBeEnabled();
  });
  it("no debería renderizar el modal si no se inicia sesión con éxito", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, "1234");

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "Credenciales inválidas" }),
      })
    );

    userEvent.click(submitButton);

    const modal = await screen.queryByText(
      "¡Bienvenido/a! Has iniciado sesión correctamente."
    );

    expect(modal).not.toBeInTheDocument();
  });
  it("debería renderizar errores de validación si el login no es exitoso", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, "1234");

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "Credenciales inválidas" }),
      })
    );

    userEvent.click(submitButton);

    expect(
      await screen.findByText("Credenciales inválidas")
    ).toBeInTheDocument();
  });
  it("debería renderizar el modal si se inicia sesión con éxito", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, "1234");
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: "jwt-token" }),
      })
    );

    userEvent.click(submitButton);

    const modal = await screen.findByText(
      "¡Bienvenido/a! Has iniciado sesión correctamente."
    );

    expect(modal).toBeInTheDocument();
  });
  it("no debería renderizar errores de validación si el login es exitoso", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, "1234");

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: "jwt-token" }),
      })
    );

    userEvent.click(submitButton);

    expect(
      screen.queryByText("Credenciales inválidas")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("La contraseña es obligatoria")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Correo inválido")).not.toBeInTheDocument();
  });
  it("debería cerrar el modal al hacer click en 'Aceptar", async () => {
    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, "1234");

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: "jwt-token" }),
      })
    );

    userEvent.click(submitButton);

    const modal = await screen.findByText(
      "¡Bienvenido/a! Has iniciado sesión correctamente."
    );
    const acceptButton = screen.queryByRole("button", { name: /aceptar/i });
    await userEvent.click(acceptButton);

    expect(modal).not.toBeInTheDocument();
  });
});
