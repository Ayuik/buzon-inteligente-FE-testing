import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Layout } from "../src/components/layouts/Layout";
import { Link, Route } from "react-router-dom";
import { renderWithRouter } from "./utilsTest";
import userEvent from "@testing-library/user-event";


describe("Layout ", () => {

    it("debería renderizar un componente hijo", async () => {

        const routes = (
            <Route path="/" element={<Layout />}>
                <Route path="test" element={<div data-testid="outlet-test">Contenido del hijo</div>}/>
            </Route>
        )

        renderWithRouter(null, { route: "/test", routes})

        const childComponent = await screen.findByTestId("outlet-test")

        expect(childComponent).toBeInTheDocument()
    })

    it("debería renderizar solo el hijo de la ruta actual", async () => {

        const routes = (
            <Route path="/" element={<Layout />}>
                <Route path="test" 
                element={
                <div data-testid="outlet-test">
                    <Link data-testid="linkToChild2" to="/test2">Contenido del hijo</Link>
                </div>
                }
                />
                <Route path="test2" 
                element={
                <div data-testid="outlet-test2">
                    <Link data-testid="linkToChild1" to="/test">Contenido del hijo 2</Link>
                </div>
                }
                />
            </Route>
        )

        renderWithRouter(null, { route: "/test", routes})


        const firstChild = await screen.findByTestId("outlet-test")
        expect(firstChild).toBeInTheDocument()
        expect(screen.queryByTestId("outlet-test2")).not.toBeInTheDocument()

        await userEvent.click(screen.getByTestId("linkToChild2"))
        
        const secondChild = await screen.findByTestId("outlet-test2")
        expect(secondChild).toBeInTheDocument()
        expect(screen.queryByTestId("outlet-test")).not.toBeInTheDocument()
        

    })
})