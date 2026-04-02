describe('Login tests using environment variables', () => {

    /**
     * Version 1: Using cy.env()
     * - cy.env() returns a **promise**.
     * - Must use `.then()` to access the value.
     * - Can access **multiple values at once** using an array.
     * - Useful when you want to handle multiple secrets in a block.
     */
    it('login using cy.env()', () => {
        cy.env(['orangeHrmUrl', 'orangeHrmUsername', 'orangeHrmPwd']).then(({ orangeHrmUrl, orangeHrmUsername, orangeHrmPwd }) => {
            cy.visit(orangeHrmUrl)
            cy.get(".orangehrm-login-layout-blob").should("be.visible")
            cy.get("[name='username']").type(orangeHrmUsername).should("have.value", "Admin")
            cy.get("[name='password']").type(orangeHrmPwd).should("have.value", "admin123")
            cy.get("[type='submit']").click()
            cy.get(".oxd-glass-button.orangehrm-upgrade-button").should('exist')
        })
    })

    /**
     * Version 2: Using Cypress.env()
     * - Cypress.env() **returns the value synchronously**.
     * - Can be used directly inside commands like `cy.visit()` or `cy.get().type()`.
     * - Best for **single values**.
     * - Cleaner syntax for simple cases, no `.then()` needed.
     */
    it('login using Cypress.env()', () => {
        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.get(".orangehrm-login-layout-blob").should("be.visible")
        cy.get("[name='username']").type(Cypress.env('orangeHrmUsername')).should("have.value", "Admin")
        cy.get("[name='password']").type(Cypress.env('orangeHrmPwd')).should("have.value", "admin123")
        cy.get("[type='submit']").click()
        cy.get(".oxd-glass-button.orangehrm-upgrade-button").should('exist')
    })

})