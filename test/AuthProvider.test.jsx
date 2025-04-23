import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "../src/context/AuthProvider";
import { mockFetch, mockJsonResponse } from "./mocks/mockFetchUtils";
import { jwtDecode } from "jwt-decode";

vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(),
}));

describe("AuthProvider", () => {
  const MockConsumer = () => {
    const { authState, credential } = useAuth();

    return (
      <div>
        <p data-testid="mock-consumer">
          Crendencial de usuario:
          {authState ? credential : "El usuario no existe"}
        </p>
      </div>
    );
  };

  const renderAuthAndChild = () => {
    render(
      <AuthProvider>
        <MockConsumer />
      </AuthProvider>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it("debería tranferir el contexto a los hijos con los valores por defecto", () => {
    renderAuthAndChild();

    expect(screen.getByText(/el usuario no existe/i)).toBeInTheDocument();
  });
  it("debería no transferir ninguna credencial en caso de token inválido", async () => {
    globalThis.localStorage.setItem("token", "invalid-token");
    globalThis.fetch = mockFetch(
      mockJsonResponse({ message: "Token inválido" }, false, 401)
    );

    jwtDecode.mockImplementation(() => ({ id: 1 }));

    renderAuthAndChild();

    expect(await screen.findByText(/el usuario no existe/i)).toBeInTheDocument();
  });
  it("debería transferir una credencial por contexto en caso de token válido", async () => {
    globalThis.localStorage.setItem("token", "valid-token");

    globalThis.fetch = mockFetch(
      mockJsonResponse({ permanentCredential: "validCredential" }, true, 200)
    );

    jwtDecode.mockImplementation(() => ({ id: 1 }));

    renderAuthAndChild();

    expect(await screen.findByText(/validCredential/i)).toBeInTheDocument();
  });
});
