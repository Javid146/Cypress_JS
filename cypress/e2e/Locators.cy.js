describe('CSSLocators', () => {

    it('test 1', () => {

        // cy.visit('http://automationpractice.com/index.php')
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get(".wikipedia-search-input").type("T-Shirts").type('{enter}')
        cy.get("#wikipedia-search-result-link a[target]").contains('T-Shirt')
    })

    it('test 2', () => {

        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get(".wikipedia-search-input").type("cars")
        cy.get("input[type='submit']").click()
        cy.xpath("//div/a[contains(@href,'Car')]").should('have.length',5)
    })
})