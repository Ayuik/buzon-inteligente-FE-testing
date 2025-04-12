import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

export function renderWithRouter(ui, { route = "/", routes } = {}) {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        {routes && routes}
        <Route path="*" element={ui}/>
      </Routes>
    </MemoryRouter>
  );
}