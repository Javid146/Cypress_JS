Cypress._.times(2, (k) => {

    it('Repeat test x times', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.title().should('contain', "Orange").and("include", "HRM").and("eq", "OrangeHRM");
    })
})


it.only('Retry test after failure', { retries: 2 }, () => {

    cy.visit(Cypress.env('orangeHrmUrl'))
    cy.title().should('contain', "Orange").and("include", "HRM").and("eq", "OrangeHRMmmm"); //fail on purpose
})
