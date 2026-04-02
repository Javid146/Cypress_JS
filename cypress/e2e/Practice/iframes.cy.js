import 'cypress-iframe'

it('appr 1', () => {

    cy.visit("https://vinothqaacademy.com/iframe/")

    cy.get("[name='employeetable']").its("0.contentDocument.body").should("be.visible").then(cy.wrap)
        .find("input#nameInput").clear().type("cucu").should("have.value", "cucu")
})


it('appr 2 robust table check', () => {

    cy.visit("https://vinothqaacademy.com/iframe/")

    const inputs = ["Javid", "CEO", "jm@empire.ca", "Baku", "God's"]
    const fields = ["input#nameInput", "input#roleInput", "input#emailInput", "input#locationInput", "input#departmentInput"]

    // Fill the form
    cy.wrap(fields).each((field, index) => {
        cy.iframeCommand("[name='employeetable']").find(field)
            .clear()
            .type(inputs[index])
            .should("have.value", inputs[index])
    })

    // Click Add
    cy.iframeCommand("[name='employeetable']").find("button#addBtn").click()

    // Verify last row dynamically
    cy.iframeCommand("[name='employeetable']")
        .find("#myTable tr").last()
        .find("td")
        .each(($td, index) => {
            if (index === 0) return // skip checkbox
            const inputIndex = index - 1
            cy.wrap($td).invoke('text').then(text => {
                cy.log(`Cell ${index}: ${text.trim()}`)
                expect(text.trim()).to.eq(inputs[inputIndex])
            })
        })
})

it('appr 3', () => {

    cy.visit("https://vinothqaacademy.com/iframe/")
})