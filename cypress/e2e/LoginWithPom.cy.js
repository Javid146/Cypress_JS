import Login from "../Pages/LoginPage"
const loginPage = new Login()

describe("pom", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('orangeHrmUrl'))
    })

    it('LoginTest', () => {
        loginPage.submitOrangeHrmCreds("Admin", "admin123")
        loginPage.verifyLogin()
    })
})