before(function () {
    cy.fixture('orangeHrm.json').as('orangeHrmData')
})


it('read data for all tests with before via fixture', function () {

    cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")
    cy.get("input[name='username']").type(this.orangeHrmData.username)
    cy.get("input[name='password']").type(this.orangeHrmData.password)
    cy.get("button[type='submit']").click()
    cy.get("div.oxd-topbar-header-title h6:first-of-type").should("have.text", this.orangeHrmData.expected)
})


it('read data using readFile()', () => {
    
    cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")

    cy.readFile('cypress/fixtures/orangeHrm.json').then((orangeHrmData) => {
        cy.get("input[name='username']").type(orangeHrmData.username)
        cy.get("input[name='password']").type(orangeHrmData.password)
        cy.get("button[type='submit']").click()
        cy.get("div.oxd-topbar-header-title h6:first-of-type")
            .should("have.text", orangeHrmData.expected)
    })
})


it.only('write file demo', () => {

    cy.writeFile('cypress/fixtures/sample.txt', "Hello, this is Javid 1 \n")
    //a+ = append, don't overwrite
    cy.writeFile('cypress/fixtures/sample.txt', "Hello, this is Javid 2", { flag: 'a+' })
})
