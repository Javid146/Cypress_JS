const setsOfData = require('../fixtures/orangeHrm2.json')

describe("Fixtures 2", () => {

    //access multiple data blocks in fixtures for multiple tests 
    setsOfData.forEach((testData) => {

        it('test with multiple sets of data 2', () => {

            //for each loop to assert test data in orangHrm.json2. this test runs 3 times as json file has 3 sets of data
            //this runs sets data within separate it blocks.
            cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")
            cy.get("input[name='username']").clear().type(testData.username)
            cy.get("input[name='password']").clear().type(testData.password)
            cy.get("button[type='submit']").click()

            if (testData.validLogin) {
                cy.get("div.oxd-topbar-header-title h6:first-of-type").should("have.text", testData.expected)
                cy.get(".oxd-userdropdown-tab").click()
                cy.get(":nth-child(4) > .oxd-userdropdown-link").click()
            }
            else {
                cy.get(".oxd-alert-content--error p").should("have.text", testData.expected)
            }
        })
    })
})