describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[id="login-email"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
    cy.get('button').contains(/^Masuk/).should('be.visible');
  });

  it('should display alert when username and password are wrong', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[id="login-email"]').type('testuser@email.com');
    cy.get('input[id="login-password"]').type('wrongpassword');
    cy.get('button').contains(/^Masuk/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

//   it('should display homepage when username and password are correct', () => {
//     cy.visit('http://localhost:5173/login');
//
//     cy.get('input[id="login-email"]').type('testing001@gmail.com');
//     cy.get('input[id="login-password"]').type('testing');
//     cy.get('button').contains(/^Masuk$/).click();
//
//     cy.get('nav').contains(/^Keluar$/).should('be.visible');
//     cy.get('button').contains('Buat Diskusi').should('be.visible');
//   });
});
