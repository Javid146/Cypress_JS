describe('ssVideo Suite', () => {


    it('ss intentional', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')

        //homepageSS is just name of the saved png of target page
        cy.screenshot('homepageSS')
        // Navigate to Apple link and back
        cy.get("button.start").click().should("have.text", "STOP").screenshot()
    })


    it.only('ss/video on failure', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')

        //fail on purpose to see ss. 
        //ss/video is only taken if tests ran from CLI (terminal, Jenkins) -> npx cypress run --spec cypress/e2e/ScreenshAndVideo.cy.js
        cy.get("button.start").click().should("have.text", "START").screenshot()
    })
})