// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/login');

  cy.get('input[id="login-email"]').type(email);
  cy.get('input[id="login-password"]').type(password);
  cy.get('button')
    .contains(/^Masuk$/)
    .click();

  cy.get('nav')
    .contains(/^Keluar$/)
    .should('be.visible');
  cy.get('button').contains('Buat Diskusi').should('be.visible');
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
