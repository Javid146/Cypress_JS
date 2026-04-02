it.only('implicit', () => {
    cy.visit(Cypress.env('orangeHrmUrl'))
    cy.get(".orangehrm-login-layout-blob").should("be.visible")
    cy.get("[name='username']").type(Cypress.env('orangeHrmUsername')).should("have.value", "Admin")
    cy.get("[name='password']").type(Cypress.env('orangeHrmPwd')).should("have.value", "admin123")
    cy.get("[type='submit']").click()
    cy.get(".oxd-glass-button.orangehrm-upgrade-button").should('exist')

    cy.get(".oxd-userdropdown-tab").find("img").should("have.attr", "src")
    cy.get(".oxd-userdropdown-tab").click()
    cy.get("ul.oxd-dropdown-menu li").contains("About").click()
    cy.get(".oxd-dialog-sheet").should("be.visible")
    cy.get(".oxd-dialog-close-button").should("have.css", "font-size", "16px").click()

    // cy.get(".oxd-main-menu:not(.--fixed) li").each((liItem) => {

    //     cy.wrap(liItem).find("span").then(($span) => {
    //         cy.log($span.text())
    //     })
    // })

    cy.get(".oxd-main-menu:not(.--fixed) li").contains("Admin").click()

    cy.get(".oxd-topbar-header-breadcrumb").then((text) => {
        assert.include(text.text(), "Admin")
    })

    // cy.go("back")
    cy.get(".oxd-userdropdown-tab").should("be.visible").click({ force: true })
    cy.get("ul.oxd-dropdown-menu").should("be.visible").find("li").should('have.length.above', 3).last().should("have.text", "Logout").click()
})