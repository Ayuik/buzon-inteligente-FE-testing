import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../src/components/Footer"; 

describe("Footer", () => {
  it("muestra el texto correcto", () => {
    render(<Footer />);

    expect(screen.getByText("2025 © Arkímedes. Todos los derechos reservados")).toBeInTheDocument();
    expect(screen.getByText("Términos de uso")).toBeInTheDocument();
    expect(screen.getByText("Política de Privacidad")).toBeInTheDocument();
  });

  it("tiene las clases y estructura correcta", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-[#00328C] text-white text-center p-4 font-bree");

    const container = footer.querySelector(".container");
    expect(container).toHaveClass("mx-auto flex flex-col md:flex-row justify-between items-center text-sm min-h-[80px]");

    const copyright = screen.getByText("2025 © Arkímedes. Todos los derechos reservados");
    expect(copyright).toHaveAttribute("id", "copyright");

    const terms = screen.getByText("Términos de uso");
    expect(terms).toHaveAttribute("id", "terms");

    const policy = screen.getByText("Política de Privacidad");
    expect(policy).toHaveAttribute("id", "policy");
  });
});