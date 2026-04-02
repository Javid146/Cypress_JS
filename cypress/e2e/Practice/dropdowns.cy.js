it('drpdwn 1', () => {

    cy.visit("https://testautomationpractice.blogspot.com/")

    cy.get("#country").select("usa").should("contain", "United States")
    cy.get("#country").select(2).should("have.value", "uk")
    cy.contains("#country option", "Germany").should("have.value", 'germany')
    cy.get("#country").select("France").should("contain.text", "France")

    cy.get("input#comboBox").click().next("div#dropdown").should("exist")
    cy.contains("Item 38").scrollIntoView().click()
    cy.get("input#comboBox").should("have.value", "Item 38")
    cy.get("input#comboBox").then((value) => {

        assert.equal(value.val(), "Item 38")
        assert(value.val().includes("Item 38"))
        expect(value.val()).to.eq("Item 38")
    })
})

it('drpdwn 2', () => {

    cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")

    cy.get("#select2-billing_country-container").click().type("Azerbaijan")
    cy.get("li").contains("Azerbaijan").click()
    cy.get("span[aria-label='Country']").should("have.text", "Azerbaijan")

    cy.get("#select2-billing_country-container").click()
    cy.get("input.select2-search__field").then((prop)=>{
        expect(prop.prop("type")).to.eq("text")
    })
    cy.get("input.select2-search__field").type("Turkmenistan").type('{enter}')
    cy.get("span[aria-label='Country']").find('span').should("have.text", "Turkmenistan").should("have.attr", "title", "Turkmenistan")
})

it.only('3', ()=>{

    cy.visit("https://www.wikipedia.org/")
    cy.get("input[name='search']").type("Azerbaijan")
    cy.get(".suggestions-dropdown").first().should("be.visible")
    cy.get("div h3 em").contains("Azerbaijan").click()
    cy.url().should("contain","Azerbaijan")
})