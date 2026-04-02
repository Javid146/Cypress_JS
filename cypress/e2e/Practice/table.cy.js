
beforeEach('visit app', () => {
    cy.visit("https://testautomationpractice.blogspot.com/")
})


it.only("", () => {

    cy.get("#productTable").scrollIntoView().should("be.visible")

    cy.get("#pagination li").then((size) => {

            const pageSize = Math.min(4, size.length)
            cy.log(pageSize)

            for (let i = 0; i < pageSize; i++) {

                cy.get("#productTable tr")
                .should("have.length", 6)
                .its("length").should("be.greaterThan", 5)

                // if (i === 3) {
                    cy.get("#productTable input").eq(i).each((chckbx) => { cy.wrap(chckbx).click() })
                // }

                cy.get("#pagination li").eq(i).click()
            }
    })
})

it('click all pages', () => {

    cy.get("#productTable").scrollIntoView().find("tr").should("have.length", 6).and("have.length.gte", 6)
    //or like this
    cy.get("#productTable").scrollIntoView().find("tr").its("length").and("be.gte", 6) //its("length") does numeric assertion


    cy.get("#pagination li a").each(page => {

        cy.get("#productTable").find("tr").should("be.visible")
        cy.wrap(page).click()
    })
})


it('click all pages and click checkboxes of last page', () => {

    // Table row assertion (numeric)
    cy.get("#productTable")
        .scrollIntoView()
        .find("tr")
        .its("length")
        .should("be.gte", 6) // numeric comparison

    // Get pagination length
    cy.get("#pagination li").its("length").then(size => {

        /*
        Math.min(4, 10) // returns 4
        Math.min(4, 3)  // returns 3
        */
        const pageNum = Math.min(4, size)

        // Iterate pages using Cypress chain, not JS for-loop
        for (let i = 0; i < pageNum; i++) {
            // Get fresh pagination link for this iteration
            cy.get("#pagination li").eq(i).then(page => {
                cy.wrap(page).click()

                // Wait for table rows to be visible after page click
                cy.get("#productTable tr").should("be.visible")

                // If last page, click checkboxes
                if (i === pageNum - 1) {
                    cy.get("#productTable input[type='checkbox']")
                        .each(cb => cy.wrap(cb).click())
                }
            })
        }
    })
})