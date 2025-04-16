import { beforeEach, describe, expect, it, vi } from "vitest";
import { login } from "../src/services/AuthService";

describe("login", () => {
  const user = { email: "example@gmail.com", password: 12345678 };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("devuelve un token si el login es exitoso", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: "jwt-token" }),
      })
    );

    const { token } = await login(user.email, user.password);

    expect(globalThis.fetch).toHaveBeenCalled();
    expect(token).toEqual("jwt-token");
  });

  it("lanza un error si la API responde con error", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "Credenciales inválidas" }),
      })
    );

    await expect(login(user.email, user.password)).rejects.toThrow(
      "Credenciales inválidas"
    );
  });
});
