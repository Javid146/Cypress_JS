const setsOfData = require('../../fixtures/orangeHrm2.json')


it("flow for 1 set of data", () => {

    cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")

    cy.fixture("orangeHrm.json").then((data) => {

        cy.get("[name='username']").type(data.username)
        cy.get("[name='password']").type(data.password)
        cy.get(".orangehrm-login-button").click()
        cy.get(".oxd-topbar-header-breadcrumb-module").should("have.text", data.expected)
    })
})


it("flow for more sets of data with if condition", () => {

    cy.fixture("orangeHrm2.json").then((data) => {

        cy.wrap(data).each((dataSet) => {

            cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")

            cy.get("[name='username']").type(dataSet.username)
            cy.get("[name='password']").type(dataSet.password)
            cy.get(".orangehrm-login-button").click()

            if (dataSet.validLogin === true) {
                cy.get(".oxd-topbar-header-breadcrumb-module").then(result => {

                    expect(result.text()).to.eq(dataSet.expected)
                    cy.get(".oxd-userdropdown-tab").click()
                    cy.get(":nth-child(4) > .oxd-userdropdown-link").click()
                })
            }
            else {
                cy.get(".oxd-alert-content.oxd-alert-content--error p").should("have.text", dataSet.expected)
            }
        })
    })
})


setsOfData.forEach(dataSet => {

    describe("flow for sets of data in diff tests", () => {

        it(`tests login success expected: ${dataSet.validLogin}`, () => {

            cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")

            cy.get("[name='username']").type(dataSet.username)
            cy.get("[name='password']").type(dataSet.password)
            cy.get(".orangehrm-login-button").click()

            if (dataSet.validLogin === true) {
                cy.get(".oxd-topbar-header-breadcrumb-module").then(result => {

                    expect(result.text()).to.eq(dataSet.expected)
                    cy.get(".oxd-userdropdown-tab").click()
                    cy.get(":nth-child(4) > .oxd-userdropdown-link").click()
                })
            }
            else {
                cy.get(".oxd-alert-content.oxd-alert-content--error p").should("have.text", dataSet.expected)
            }
        })
    })
})


it('flow with readFile()', () => {

    cy.readFile('cypress/fixtures/orangeHrm2.json').then(data => {

        cy.wrap(data).each(dataSet => {

            cy.visit(Cypress.env('orangeHrmUrl') + "/web/index.php/auth/login")

            cy.get("[name='username']").type(dataSet.username)
            cy.get("[name='password']").type(dataSet.password)
            cy.get(".orangehrm-login-button").click()

            if (dataSet.validLogin === true) {
                cy.get(".oxd-topbar-header-breadcrumb-module").then(result => {

                    expect(result.text()).to.eq(dataSet.expected)
                    cy.get(".oxd-userdropdown-tab").click()
                    cy.get(":nth-child(4) > .oxd-userdropdown-link").click()
                })
            }
            else {
                cy.get(".oxd-alert-content.oxd-alert-content--error p").should("have.text", dataSet.expected)
            }
        })
    })
})

it.only('write file with writeFile()', () => {

    cy.writeFile('cypress/fixtures/javid.json', 'my first line \n')
    cy.writeFile('cypress/fixtures/javid.json', 'my second line', { flag: "a+" }) //a+ = append
})