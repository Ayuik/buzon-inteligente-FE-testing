import { describe, expect, it } from "vitest";
import { PackageDetailsView } from "../src/pages/packages/PackageDetailsView";
import { renderWithRouter } from "./utilsTest";
import { screen } from "@testing-library/react";
import { PackageDetailsCard } from "../src/components/cards/PackageDetailsCard";


describe("PackageDetailsView", () => {

    it("debería renderizar el contendor", () => {

        renderWithRouter(<PackageDetailsView />);
        const container = screen.getByTestId("package-details-container");
        expect(container).toBeInTheDocument();
    })

    it("debería contener el componente PackageDetailsCard dentro del contenedor", () => {

        renderWithRouter(<PackageDetailsView />)
        const container = screen.getByTestId("package-details-container");

        const packageDetailsCard = screen.getByTestId("package-details-card")

        expect(container).toContainElement(packageDetailsCard)
    })
})