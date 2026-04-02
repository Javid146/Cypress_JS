
/*
 _ is Lodash

Cypress._.times(3, () => {
  cy.log("hello")
})

is equivalent to loop like:

for (let i = 0; i < 3; i++) {
   cy.log("hello")
}
*/
Cypress._.times(2, () => { 

    it('Repeat test x times regardless', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.title().should('contain', "Orange").and("include", "HRM").and("eq", "OrangeHRM");
    })
})


it.only('Retry test only after failure', { retries: 2 }, () => {

    cy.visit(Cypress.env('orangeHrmUrl'))
    cy.title().should('contain', "Orange").and("include", "HRM").and("eq", "OrangeHRMmmm"); //fail on purpose
})
