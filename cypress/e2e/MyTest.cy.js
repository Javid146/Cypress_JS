
describe('My suite 1', function() { //each describe block is test suite containing it (each it is standalone test) blocks

    it('test positive', () => {
        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.title().should('eq','OrangeHRM') //title equals
    })

    it('test negative', () => {
        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.title().should('eq','OrangeHRM123') //title equals
    })
})