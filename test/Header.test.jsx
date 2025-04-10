import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("should exist",() => {
    render(<Footer />);

    expect(screen.getByText("2025 © Arkímedes. Todos los derechos reservados")).toBeInTheDocument();
    expect(screen.getByText("Términos de uso")).toBeInTheDocument();
    expect(screen.getByText("Política de Privacidad")).toBeInTheDocument();
  });
});