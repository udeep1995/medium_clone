// https://docs.cypress.io/api/introduction/api.html
describe("Landing Page Test", () => {
  it("Visits the app rool url", () => {
    cy.visit("/");
    cy.get("nav").should("be.visible");
    cy.contains("h1", "Medium Clone");
  });
});

describe("SignIn Test", () => {
  it("should render signin view", () => {
    cy.visit("/");
    cy.get(".signin").click();
    cy.contains("h1", "Sign In");
    cy.get("form").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
  });
  it("should sign in with provided credentials", () => {
    cy.visit("/signin");
    cy.get("#email").type("unnamed1073@gmail.com");
    cy.get("#password").type("password");
    cy.get("button").click();
    cy.get(".nav.navbar-nav > li").should($lis => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain("Home");
      expect($lis.eq(1)).to.contain("New Article");
      expect($lis.eq(2)).to.contain("Logout");
    });
  });
  it("should logout user", () => {
    cy.get(".nav.navbar-nav > li:last-child").click();
    cy.get(".nav.navbar-nav > li").should($lis => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain("Home");
      expect($lis.eq(1)).to.contain("Sign up");
      expect($lis.eq(2)).to.contain("Sign in");
    });
  });
});
