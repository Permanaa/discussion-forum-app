/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when password doesnt match
 *   - should display alert when password length less than 6
 *
 */

describe('Register spec', () => {
  it('should display register page correctly', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[id="register-name"]').should('be.visible');
    cy.get('input[id="register-email"]').should('be.visible');
    cy.get('input[id="register-password"]').should('be.visible');
    cy.get('input[id="register-confirm-password"]').should('be.visible');
    cy.get('button')
      .contains(/^Daftar/)
      .should('be.visible');
  });

  it('should display alert when password doesnt match', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[id="register-name"]').type('Testing');
    cy.get('input[id="register-email"]').type('testing@email.com');
    cy.get('input[id="register-password"]').type('password');
    cy.get('input[id="register-confirm-password"]').type('doesnt_match');
    cy.get('button')
      .contains(/^Daftar/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password tidak sama!');
    });
  });

  it('should display alert when password length less than 6', () => {
    cy.visit('http://localhost:5173/register');

    cy.get('input[id="register-name"]').type('Testing');
    cy.get('input[id="register-email"]').type('testing@email.com');
    cy.get('input[id="register-password"]').type('pass');
    cy.get('input[id="register-confirm-password"]').type('pass');
    cy.get('button')
      .contains(/^Daftar/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password setidaknya 6 karakter!');
    });
  });
});
