describe("Table", () => {

    beforeEach("visit app page before each test", () => {
        cy.visit("https://testautomationpractice.blogspot.com/")
    })

    it('check num of rows/columns', () => {

        cy.get("#productTable tr").should("have.length", 6)
        cy.get("#productTable tbody tr:nth-child(1) td").should("have.length", 4)
    })


    it('check specific row/cell data', () => {
        cy.get("#productTable tbody tr:nth-child(4) td:nth-child(2)").should("have.text", "Smartwatch")
    })


    it('read all rows/columns data on 1st page', () => {

        cy.get("#productTable tbody tr")
            .each(($row) => {

                cy.wrap($row).within(() => {

                    cy.get("td").each(($cell) => {
                        cy.log($cell.text())
                    })
                })
            })
    })


    it.skip("pagination with within", () => {

        cy.get("#pagination li").its("length").then((size) => {

            // Only check first 4 pages or fewer if size < 4
            const pagesToCheck = Math.min(4, size)

            for (let i = 0; i < pagesToCheck; i++) {

                // Select the i-th page directly
                cy.get("#pagination li").eq(i).click()

                // Ensure table rows are loaded
                cy.get("#productTable tbody tr").should('exist')

                // Loop through all rows
                cy.get("#productTable tbody tr").each(($row) => {

                    // Option 1: Use within() to scope all commands to this row
                    cy.wrap($row).within(() => {
                        cy.get("td").each(($cell, cellIndex) => {
                            cy.wrap($cell).invoke('text').then((text) => {
                                cy.log(`Row ${$row.index() + 1}, Cell ${cellIndex + 1}: ${text}`)
                            })
                        })
                    })
                })
            }
        })
    })


    it('pagination - first 4 pages only', () => {

        cy.get("#pagination li").then((size) => {

            // Only loop up to 4 pages or the total number of pages
            const pagesToCheck = Math.min(4, size.length)

            for (let i = 0; i < pagesToCheck; i++) {
                // Select the i-th page (0-based index)
                cy.get("#pagination li").eq(i).click()

                // Wait for the table rows to load
                cy.get("#productTable tbody tr").should('exist')

                // Loop through table rows
                cy.get("#productTable tbody tr").each(($row) => {

                    // Get the second column's text
                    cy.wrap($row).find("td:nth-child(2)").invoke('text').then((text) => {
                        cy.log(text)
                    })
                })
            }
        })
    })


    it.skip('optimal cypress looping', () => {
        cy.get('#pagination li').each(($page) => {
            cy.wrap($page).click()

            cy.get('#productTable tbody tr').each(($row) => {
                cy.wrap($row).find('td:nth-child(2)').invoke('text').then((text) => {
                    cy.log(text)
                })
            })
        })
    })
})