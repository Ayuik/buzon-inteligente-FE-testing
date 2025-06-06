import { randomDNI, randomEmail } from "./register.cy.js";

describe("api tests", () => {
  context("GET /api/profile", () => {
    it("get users", () => {
      cy.request("GET", "http://localhost:8080/api/profile").then(
        (response) => {
          expect(response.status).to.eq(200);

          expect(response.body).to.be.an("array");
          expect(response.body).length.to.be.greaterThan(2);

          response.body.forEach((profile) => {
            expect(profile).to.have.property("permanentCredential");
          });
        }
      );
    });
  });
  context("POST /api/auth/login", () => {
    it.only("should successfully log in with valid credentials", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:8080/api/auth/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          email: "freddiemercury@example.com",
          password: "bWVyY3UxMjM0NQ==",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token").and.to.be.a("string");
      });
    });
  });

  context("POST /api/auth/register", () => {
    it("should successfully sign in", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:8080/api/auth/register",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          userDni: randomDNI(),
          userName: "bobb",
          userSurname: "espo",
          userEmail: randomEmail(),
          userPassword: "Ym9iMTIzNDU=",
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});
