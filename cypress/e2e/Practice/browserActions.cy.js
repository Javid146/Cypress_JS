it('actions', () => {

    cy.visit(Cypress.env('testAutomPracticeUrl'))

    cy.clickLaptopLnk("apple")
    cy.go("back")
    cy.clickLaptopLnk("dell")
    cy.go(-1)
    cy.go("forward")
    cy.get("#lenovo").should("be.visible")
    cy.clickLaptopLnk("lenovo")
    cy.go("back")
})