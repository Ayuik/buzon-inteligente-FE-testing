describe("homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  })
  
  it("eureka logo is visible", () => {
    cy.get('img[alt="Eureka logo"]').should("be.visible");
  });

  it("contains two buttons", () => {
    cy.get("button").should("have.length", 2);
  });

  it("contains a login button", () => {
    cy.get("button").eq(0).should("have.text", "Iniciar sesión");
  });

  it("contains a register button", () => {
    cy.get("button").eq(1).should("have.text", "Registrarse");
  });
});
