describe("suite", () => {

    it.only('dropdown with select', () => {

        cy.visit("https://testautomationpractice.blogspot.com/")

        cy.get("#country").select('france').should("have.value", "france") //by value
        cy.get("#country").select('Canada').should("contain", "Canada") //by text
        cy.get("#country").select(3).should("have.value", "germany") //by index (index starts from 0)
        cy.contains("#country option", "Germany").should("exist") //id + text
    })

    it.skip('dropdown without select', () => {
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")

        cy.get("#select2-billing_country-container").click()
        cy.get("input.select2-search__field").type("azerbaijan").type("{enter}")
        cy.get("#select2-billing_country-container").should("have.text", "Azerbaijan")

        cy.get("#select2-billing_country-container").click()
        cy.get("input.select2-search__field").clear().type("france").type("{enter}")
        cy.get("#select2-billing_country-container").should("have.text", "France")

    })

    it.skip('auto-suggest dropdown', () => {
        cy.visit("https://wikipedia.org")
        cy.get("input#searchInput").type("baku")
        cy.get("a h3 em").contains("Baku").click() //if dropdown options contains baku click it

    })

    it('dynamic dropdown', () => {
        cy.visit("https://en.wikipedia.org")

        cy.get("#p-search > .cdx-button--fake-button > .vector-icon").click()
        cy.get("#searchform > .cdx-search-input > .cdx-search-input__input-wrapper > .cdx-text-input > [name='search']").click().type("julia sebasti", { delay: 50 })

        cy.get('.cdx-menu__listbox', { includeShadowDom: true }).should('be.visible')
        cy.get("span.cdx-menu-item__text").should("have.length.greaterThan", 3)

        cy.get(".cdx-menu-item__text__label > bdi")
            .each(($el) => {
                if ($el.text().includes("Julia Sebastián")) {
                    cy.wrap($el).click()
                }
            })

        cy.get('#firstHeading').should("have.text", "Julia Sebastián")
    })
})
