describe('Custom commands', () => {

    //add custom commands in commands.js

    it('handling links', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.clickLaptopLink("apple")
    })


    it.only('login command', () => {
        cy.visit(Cypress.env('orangeHrmUrl')+"/web/index.php/auth/login")
        cy.loginOrangeHrm("Admin", "admin123")
    })
})