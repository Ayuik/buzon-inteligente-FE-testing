import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useLogin } from "../src/components/useLogin";

describe("useLogin", () => {
  const validEmail = "test@example.com";
  const invalidEmail = "testexamplecom";
  const password = "1234";
  const token = "jwt-token";

  globalThis.localStorage = {
    setItem: vi.fn(),
  };

  afterEach(() => vi.resetAllMocks());

  it("debería tener propiedades iniciales correctas", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.formData).toEqual({ email: "", password: "" });
    expect(result.current.formErrors).toEqual({ email: "", password: "" });
    expect(result.current.loginError).toEqual("");
    expect(result.current.showPopover).toEqual(false);
  });
  it("debería asignar solamente el valor email del campo formData si el name es 'email'", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: validEmail },
      });
    });

    expect(result.current.formData.email).toBe(validEmail);
    expect(result.current.formData.password).toBe("");
  });
  it("debería asignar solamente el valor 'password' del campo formData si el name es 'password'", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleChange({
        target: { name: "password", value: password },
      });
    });

    expect(result.current.formData.email).toBe("");
    expect(result.current.formData.password).toBe(password);
  });
  it("debería asignar el error 'La contraseña es obligatoria' si el campo password esta vacío", () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.handleChange({
        target: { name: "password", value: "" },
      });
    });

    expect(result.current.formErrors.password).toBe(
      "La contraseña es obligatoria"
    );
  });
  it("debería asignar el error 'Correo inválido' si el campo email no cumple la expresión regular", () => {
    const { result } = renderHook(() => useLogin());

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test(validEmail)).toEqual(true);
    expect(emailRegex.test(invalidEmail)).toEqual(false);

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: validEmail },
      });
    });

    expect(result.current.formErrors.email).toBe("");

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: invalidEmail },
      });
    });

    expect(result.current.formErrors.email).toBe("Correo inválido");
  });
  it("debería llamar al servicio de login si no hay errores en el formulario", async () => {
    const { result } = renderHook(() => useLogin());

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: token }),
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: validEmail },
      });
    });

    act(() => {
      result.current.handleChange({
        target: { name: "password", value: password },
      });
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(globalThis.fetch).toHaveBeenCalled();
  });
  it("debería guardar el token en localStorage tras llamar al servicio", async () => {
    const { result } = renderHook(() => useLogin());

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: token }),
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: validEmail },
      });
    });
    act(() => {
      result.current.handleChange({
        target: { name: "password", value: password },
      });
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(globalThis.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
      "token",
      token
    );
  });
  it("debería actualizar el estado de loginError con el mensaje de error del servicio si hay algún error", async () => {
    const { result } = renderHook(() => useLogin());
    const message = "Credenciales inválidas";

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: message }),
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: validEmail },
      });
    });
    act(() => {
      result.current.handleChange({
        target: { name: "password", value: password },
      });
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      });
    });

    expect(result.current.loginError).toBe(message);
  });
});
