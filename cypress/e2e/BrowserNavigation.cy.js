describe('Navigation', () => {

    // ignore uncaught exceptions in the app
    Cypress.on('uncaught:exception', () => false)

    it('Navigation test', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')

        // Navigate to Apple link and back
        cy.clickLaptopLink("apple")
        cy.go('back')

        cy.get("a[href*='udemy']").should("be.visible") // wait automatically for visibility

        // Navigate to Dell link and back
        cy.clickLaptopLink("Dell")
        cy.go(-1)

        cy.get("a[href*='udemy']").should("be.visible")

        // Forward to Dell page and back
        cy.go('forward')  // forward = cy.go(1)
        cy.go('back')
        cy.get("a[href*='udemy']").should("be.visible")

        // Forward and back
        cy.go(1)
        cy.go('back')
        cy.reload() // reload at the end to reset
    })
})
