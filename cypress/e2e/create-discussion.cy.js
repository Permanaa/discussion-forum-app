// describe('Create Discussion spec', () => {
//   it('should display discussion page', () => {
//     cy.login('testing001@gmail.com', 'testing')
//
//     cy.get('button').contains('Buat Diskusi').click()
//
//     cy.get('h2').contains('Buat Diskusi').should('be.visible')
//     cy.get('input[id=thread-title]').should('be.visible')
//     cy.get('input[id=thread-category]').should('be.visible')
//     cy.get('textarea[id=thread-body]').should('be.visible')
//     cy.get('button[id=thread-create-button]').contains('Buat').should('be.visible')
//   })
//
//   it('should create discussion successfully', () => {
//     cy.login('testing001@gmail.com', 'testing')
//
//     const inputTest = {
//       title: 'Title Testing',
//       category: 'testing',
//       body: 'This is body for testing'
//     }
//
//     cy.get('button').contains('Buat Diskusi').click()
//     cy.get('input[id=thread-title]').type(inputTest.title)
//     cy.get('input[id=thread-category]').type(inputTest.category)
//     cy.get('textarea[id=thread-body]').type(inputTest.body)
//     cy.get('button[id=thread-create-button]').contains('Buat').click()
//
//     cy.get('p').contains('Testing001').should('be.visible')
//     cy.get('p').contains(inputTest.title).should('be.visible')
//     cy.get('p').contains(`#${inputTest.category}`).should('be.visible')
//     cy.get('div[class=thread-item__body]').contains(inputTest.body).should('be.visible')
//   })
// })
