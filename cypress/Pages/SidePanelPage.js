class SidePanel {

    clickSidePanelBtn(btnName) {
        const btn = `.oxd-main-menu-item[href*="${btnName}"]`
        cy.get(btn).click()
        cy.get(btn).should("have.class", "active")
    }
}

module.exports = SidePanel