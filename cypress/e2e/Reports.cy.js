describe('Reports Suite', () => {

    /*
    1. npm i --save-dev cypress-mochawesome-reporter

    2. in config.js add:
    reporter: 'cypress-mochawesome-reporter'
    require('cypress-mochawesome-reporter/plugin')(on)

    3. in support/e2e.js add
    import 'cypress-mochawesome-reporter/register'

    4. run: npx cypress run --spec cypress/e2e/Reports.cy.js  
    5. copy index.html path from reports and paste in browser: C:\Users\Dell\OneDrive\Desktop\QA Skills\Cypress\cypress\reports\html\index.html       
    */

    it('test 1', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("button.start").click().should("have.text", "STOP").screenshot() //pass

    })


    it('test 2', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("button.start").click().should("have.text", "START").screenshot() //fail
    })
})