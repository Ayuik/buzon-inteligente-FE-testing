import exampleUser from "../fixtures/example.json";
describe("Login User", () => {
  beforeEach(() => {
    cy.visit("/");
  })
  context("User Journey from Homepage", () => {
    it.only("login user", () => {
      cy.get("button").eq(0).click();
      cy.location("pathname").should("equal", "/login");
      cy.getByPlaceholder("Correo electrónico:").type(exampleUser.email);
      cy.getByPlaceholder("Contraseña:").type(exampleUser.password);
      cy.get("button").contains("Enviar").click();
      cy.get('[data-testid="success-popover"]').contains("Login exitoso");
      cy.contains("Aceptar").click();
      cy.location("pathname").should("equal", "/user/packages");
    });
  });
  context("User Journey from Register form", () => {
    it("login user", () => {
      cy.visit("register");
      cy.get("a").contains("Iniciar Sesión").click();
      cy.location("pathname").should("equal", "/login");
      cy.getByPlaceholder("Correo electrónico:").type(exampleUser.email);
      cy.getByPlaceholder("Contraseña:").type(exampleUser.password);
      cy.get("button").contains("Enviar").click();
      cy.get('[data-testid="success-popover"]').contains("Login exitoso");
      cy.contains("Aceptar").click();
      cy.location("pathname").should("equal", "/user/packages");
    });
  });
  context("unhappy paths", () => {
    beforeEach(() => {
      cy.visit("login");
    });
    it("empty fields", () => {
      cy.contains("Enviar").should("be.disabled");
    });

    it("wrong credentials", () => {
      cy.getByPlaceholder("Correo electrónico:").type("bobesponja@example.com");
      cy.getByPlaceholder("Contraseña:").type("bob1234");
      cy.get("button").contains("Enviar").click();
      cy.get('[data-testid="success-popover"]').should("not.exist");
    });
  });
});
