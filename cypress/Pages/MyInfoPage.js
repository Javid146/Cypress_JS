

class MyInfoPage {

    clickEmployeeTabList(tabName) {
        cy.get(".orangehrm-tabs div a").its("length").should("be.gte", 10)
        cy.contains(tabName).click().should("have.class", "--active")
    }

    verifyEmployeeNameHeaderCorrect() {

        cy.get(".oxd-userdropdown-tab p").then((nameText) => {

            const name = nameText.text().trim()
            cy.get(".orangehrm-edit-employee-name h6").should("have.text", name)
        })
    }
}

export { MyInfoPage }