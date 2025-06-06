export const randomDNI = () => {
    const numbers = Math.floor(10000000 + Math.random() * 90000000);
    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const letter = letters[numbers % 23];
    return `${numbers}${letter}`;
  };

export const randomEmail = () => { return `user${Date.now()}@example.com`;};

describe("Register User", () => {

  context("User Journey from Homepage", () => {
    it("register new user", () => {
      cy.visit("http://localhost:5173");
      cy.get("button").eq(1).click();
      cy.location("pathname").should("equal", "/register");
      cy.getByPlaceholder("Nombre:").type("minnieB");
      cy.getByPlaceholder("Apellidos:").type("mouse");
      cy.getByPlaceholder("Correo electrónico:").type(randomEmail());
      cy.getByPlaceholder("DNI:").type(randomDNI());
      cy.getByPlaceholder("Contraseña:").type("Prueba123");
      cy.getByPlaceholder("Confirmar contraseña:").type("Prueba123");
      cy.get("button").contains("Enviar").click();
      cy.wait(1000);
      cy.get('[data-testid="success-popover"]').contains(
        "¡Registro completado!"
      );
      cy.contains("Aceptar").click();
      cy.location("pathname").should("equal", "/login");
    });
  });
  
  context("unhappy paths", () => {
    beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  })
    it("empty fields", () => {
      cy.get("button").contains("Enviar").click();
      cy.get('[data-testid="success-popover"]').should("not.exist");
    });

    it.only("unmatching passwords", () => {
      cy.getByPlaceholder("Nombre:").type("minnieW");
      cy.getByPlaceholder("Apellidos:").type("mouse");
      cy.getByPlaceholder("Correo electrónico:").type(randomEmail());
      cy.getByPlaceholder("DNI:").type(randomDNI());
      cy.getByPlaceholder("Contraseña:").type("Prueba123");
      cy.getByPlaceholder("Confirmar contraseña:").type("Prueba222");
      cy.get("button").contains("Enviar").click();
      cy.get('[data-testid="success-popover"]').should("not.exist");
    });

    it("already existing user", () => {
      cy.getByPlaceholder("Nombre:").type("Bob");
      cy.getByPlaceholder("Apellidos:").type("Esponja");
      cy.getByPlaceholder("Correo electrónico:").type("bobesponja@example.com");
      cy.getByPlaceholder("DNI:").type("12345678A");
      cy.getByPlaceholder("Contraseña:").type("Prueba123");
      cy.getByPlaceholder("Confirmar contraseña:").type("Prueba123");
      cy.get("button").contains("Enviar").click();
      cy.get('[data-testid="success-popover"]').should("not.exist");
    });
  });

  context("User Journey from Login form", () => {
    it("register new user", () => {
      cy.visit("http://localhost:5173/login");
      cy.get("a").contains("Regístrate").click();
      cy.location("pathname").should("equal", "/register");
      cy.getByPlaceholder("Nombre:").type("minnieW");
      cy.getByPlaceholder("Apellidos:").type("mouse");
     cy.getByPlaceholder("Correo electrónico:").type(randomEmail());
      cy.getByPlaceholder("DNI:").type(randomDNI());
      cy.getByPlaceholder("Contraseña:").type("Prueba123");
      cy.getByPlaceholder("Confirmar contraseña:").type("Prueba123");
      cy.get("button").contains("Enviar").click();
      cy.wait(1000);
      cy.get('[data-testid="success-popover"]').contains(
        "¡Registro completado!"
      );
      cy.contains("Aceptar").click();
      cy.location("pathname").should("equal", "/login");
    });
  });
});
