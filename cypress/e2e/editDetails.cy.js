import { randomDNI, randomEmail } from "./register.cy";
import exampleUser from "../fixtures/example.json";

describe("Edit user's details", () => {
  context("User Journey from /packages", () =>{
    it.only("new details are sent", () => {
      const newDNI = randomDNI();
      const newEmail = randomEmail();

      cy.login(exampleUser.email, exampleUser.password);

      cy.intercept(
        "PUT",
        "http://localhost:8080/api/profile/user/*",
        (req) => {
          req.reply({
            statusCode: 200,
            body: {
              userDni: newDNI,
              userName: exampleUser.newUserName,
              userSurname: exampleUser.newUserSurname,
              userEmail: newEmail,
            },
          });
        }
      ).as("updateUser");

      cy.visit("http://localhost:5173/user/packages"); //borrar al corregir login
      cy.get("a").contains("Mi cuenta").click();
      cy.url().should("include", "/myaccount");
      cy.get("h1").should("have.text", "Datos personales");
      cy.get("button").contains("Editar datos").click();
      cy.get("div[data-test='edition']").within(() => {
        //data-test agregado para cypress
        cy.get("div").as("div-form");
      });
      cy.get("@div-form").find("input").should("have.length", 6);
      cy.get("input[name='name']").type(exampleUser.newUserName);
      cy.get("input[name='surname']").type(exampleUser.newUserSurname);
      cy.get("input[name='dni']").type(newDNI);
      cy.get("input[name='email']").type(newEmail);
      cy.get("button").contains("Guardar").click();

      cy.wait("@updateUser").its("request.body").should("deep.include", {
        userDni: newDNI,
        userName: exampleUser.newUserName,
        userSurname: exampleUser.newUserSurname,
        userEmail: newEmail,
      })
    })
    })
  })
