describe("Suite", () => {

    it('radio button test', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')

        cy.get("#male[name='gender']").check().should('be.checked')
        cy.get("#female[name='gender']").should("not.be.checked")

        cy.get("#female[name='gender']").check().should('be.checked')
        cy.get("#male[name='gender']").should("not.be.checked")
    })

    it('checkbox interaction test', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("#sunday").check().should('be.checked')
        cy.get("#monday").should('be.not.checked')
    })

    it('multiple checkbox interaction test', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')

        //check all boxes without using loop. -> cypress returns all elements available with get()
        cy.get(".form-check-input[type='checkbox']").check().should('be.checked')
        cy.get(".form-check-input[type='checkbox']").uncheck().should('be.not.checked')

        //check 1st and last boxes
        cy.get(".form-check-input[type='checkbox']").first().check().should('be.checked')
        cy.get(".form-check-input[type='checkbox']").last().check().should('be.checked')
    })
})