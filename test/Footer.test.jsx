import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../src/components/Footer"; 

describe("Footer", () => {
  it("muestra el texto correcto", () => {
    render(<Footer />);

    expect(screen.getByText("2025 © Arkímedes. Todos los derechos reservados")).toBeInTheDocument();
  });

  it("tiene las clases y estructura correcta", () => {
    render(<Footer />);

    const footer = screen.getByTestId("footer");
    const footerContent = screen.getByTestId("footer-content");
    
    expect(footer).toHaveClass("flex flex-col md:flex-row justify-between items-center mb-0 text-sm w-screen bg-[#00328C] text-white text-center p-4 font-bree")
    expect(footerContent).toHaveClass("md:text-left items-center w-screen md:mb-0")
  });
});