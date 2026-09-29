describe('Create Comment spec', () => {
  it('should display comment form', () => {
    cy.login('testing001@gmail.com', 'testing')

    cy.get('p').contains('Halo! Selamat datang dan silakan perkenalkan diri kamu').click()

    cy.get('textarea[placeholder="Bergabung dalam diskusi"]').should('be.visible')
    cy.get('button').contains('Komentar').should('be.visible')
  })

  it('it should create comment', () => {
    cy.login('testing001@gmail.com', 'testing')

    cy.get('p').contains('Halo! Selamat datang dan silakan perkenalkan diri kamu').click()

    const inputTest = {
      body: 'Testing comment with cypress'
    }

    cy.get('textarea[placeholder="Bergabung dalam diskusi"]').type(inputTest.body)
    cy.get('button').contains('Komentar').click()

    cy.get('p').contains('Testing001').should('be.visible')
    cy.get('div[class=comment__content]').contains(inputTest.body).should('be.visible')
  })
})
