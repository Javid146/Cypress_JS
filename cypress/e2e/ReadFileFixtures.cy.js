describe("Fixtures", () => {

    // it('access app with data directly via fixtures', () => {

    // cy.visit(Cypress.env('orangeHrmUrl')+"/web/index.php/auth/login")

    //     cy.fixture("orangeHrm.json").then((data) => {

    //         cy.get("input[name='username']").type(data.username)
    //         cy.get("input[name='password']").type(data.password)
    //         cy.get("button[type='submit']").click()
    //         cy.get("div.oxd-topbar-header-title h6:first-of-type").should("have.text", data.expected)
    //     })
    // })

    //access multiple data blocks in fixtures for multiple tests 
    it.only('access data blocks via fixtures', () => {

        cy.fixture("orangeHrm2.json").then((data) => {

            //for each loop to assert test data in orangHrm.json2. this test runs 3 times as json file has 3 sets of data
            //this runs whole data within 1 it block. If a part of test fails whole test fails
            cy.wrap(data).each((userData) => {

                cy.visit(Cypress.env('orangeHrmUrl')+"/web/index.php/auth/login")
                cy.get("input[name='username']").clear().type(userData.username)
                cy.get("input[name='password']").clear().type(userData.password)
                cy.get("button[type='submit']").click()

                if (userData.validLogin) {
                    cy.get("div.oxd-topbar-header-title h6:first-of-type").should("have.text", userData.expected)
                    cy.get(".oxd-userdropdown-tab").click()
                    cy.get(":nth-child(4) > .oxd-userdropdown-link").click()
                }
                else {
                    cy.get(".oxd-alert-content--error p").should("have.text", userData.expected)
                }
            })
        })
    })
})