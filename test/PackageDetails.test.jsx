import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PackageDetailsCard } from "../src/components/cards/PackageDetailsCard";
import { renderWithRouter } from "./utilsTest";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";

describe("PackageDetailsCard", () => {
  it("debería renderizar los campos de la tarjeta", () => {
    renderWithRouter(<PackageDetailsCard />);

    expect(screen.getByText("Nombre del paquete:")).toBeInTheDocument();
    expect(screen.getByText("Código de pedido:")).toBeInTheDocument();
    expect(screen.getByText("Fecha de entrega:")).toBeInTheDocument();
    expect(screen.getByText("Estado:")).toBeInTheDocument();
  });

  it("debería redirigir a '/packages' al presionar 'VOLVER'", async () => {
    renderWithRouter(<PackageDetailsCard />, {
      routes: (
        <Route
          path="/user/packages"
          element={<div data-testid="packages-page">Packages Page</div>}
        />
      ),
    });

    const destinationLink = "/user/packages";
    const volverLink = screen.getByTestId("packages-link");
    expect(volverLink).toHaveAttribute("href", destinationLink);

    userEvent.click(volverLink);

    const packagesPage = await waitFor(() =>
      screen.findByTestId("packages-page")
    );

    expect(packagesPage).toBeInTheDocument();
    expect(volverLink).not.toBeInTheDocument();
  });
});
