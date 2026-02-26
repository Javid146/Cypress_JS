describe('Handle Tabs', () => {


    it.skip('approach 1', () => {
        cy.visit("https://the-internet.herokuapp.com/windows")

        cy.xpath("//a[text()='Click Here']").invoke("removeAttr", "target").click()

        cy.url().should("contain", "https://the-internet.herokuapp.com/windows/new")
        cy.wait(3000)
        cy.go('back')
    })

    it('approach 2', () => {
        cy.visit("https://the-internet.herokuapp.com/windows")

        cy.get("a[href*='new']").then((el) => {
            let url = el.prop("href")
            cy.visit(url)

            cy.wait(1000)
            cy.url().should("include", url)
            cy.go('back')
        })
    })
})