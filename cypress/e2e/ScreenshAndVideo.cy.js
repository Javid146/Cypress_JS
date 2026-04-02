describe('ssVideo Suite', () => {

    /*
    .screenshot() can be totally avoided by just adding this in config.js file:
    export default defineConfig({
    video: true,
    screenshotOnRunFailure: true
    })
    */

    it('ss intentional', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')

        //homepageSS is just name of the saved png of target page
        cy.screenshot('homepageSS')
        // Navigate to Apple link and back
        cy.get("button.start").click().should("have.text", "STOP").screenshot() //or name it: .screenshot("stop-button-state")
    })


    it.only('ss/video on failure', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')

        //fail on purpose to see ss. 
        //video is only taken if tests ran from CLI (terminal, Jenkins) -> npx cypress run --spec cypress/e2e/ScreenshAndVideo.cy.js
        cy.get("button.start").click().should("have.text", "START").screenshot()
    })
})