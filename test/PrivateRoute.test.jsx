import { describe, expect, it, vi } from "vitest";
import { PrivateRoute } from "../src/routing/routes/utils/PrivateRoute";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../src/context/AuthProvider";

vi.mock("../src/context/AuthProvider", async () => {
  const actual = await vi.importActual("../src/context/AuthProvider");
  const mockUseAuth = vi.fn();
  return {
    ...actual,
    useAuth: mockUseAuth,
  };
});

describe("PrivateRoute", () => {
  const MockPrivateRoute = () => {
    return <div data-testid="mock-private">Soy una ruta privada</div>;
  };

  const MockLogin = () => {
    return (
      <div>
        <Link data-testid="login-link" to="/private">
          Navega a la ruta privada
        </Link>
      </div>
    );
  };

  const TestRouter = ({ init }) => (
    <AuthProvider>
      <MemoryRouter initialEntries={[init]}>
        <Routes>
          <Route path="/private" element={<PrivateRoute />}>
            <Route index element={<MockPrivateRoute />} />
          </Route>
          <Route path="/login" element={<MockLogin />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  it("debería redirigir a login si el usuario no está validado e intenta acceder a una ruta privada", async () => {
    useAuth.mockReturnValue({ authState: false });

    render(<TestRouter init="/login" />);
    const loginLink = await screen.findByTestId("login-link");
    const privateRoute = screen.queryByTestId("mock-private");

    expect(loginLink).toBeInTheDocument();
    expect(privateRoute).not.toBeInTheDocument();

    await userEvent.click(loginLink);

    const loginRouteContent = await screen.findByText(
      /navega a la ruta privada/i
    );

    expect(privateRoute).not.toBeInTheDocument();
    expect(loginRouteContent).toBeInTheDocument();
  });
  it("debería redirigir a la ruta privada si el usuario está validado", async () => {
    useAuth.mockReturnValue({ authState: true });

    render(<TestRouter init="/login" />);
    const privateRoute = screen.queryByTestId("mock-private");
    const loginLink = screen.queryByTestId("login-link");

    expect(privateRoute).not.toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();

    await userEvent.click(loginLink);

    const privateRouteAfterClick = await screen.findByTestId("mock-private");
    expect(privateRouteAfterClick).toBeInTheDocument();
  });
});
