describe('Assertion Suite', () => {

    /*
    ===============================================================
    process.env in Node.js (used in Cypress configand how it is used in plugins?)
    ===============================================================
    
    1️⃣ What is process.env?
    
    - `process` is a global object in Node.js representing the running Node.js process.
    - `process.env` is a property that contains all the **environment variables** available to Node.js.
    - These environment variables usually come from:
        • Your operating system (OS)
        • Your CI/CD environment
        • Terminal / shell before starting Cypress
    
    2️⃣ Why it’s used in Cypress?
    
    - Cypress tests run in the browser, but Cypress itself runs on **Node.js**.
    - You often have secrets or configurable values like API keys, database passwords, or URLs you **don’t want hard-coded**.
    - `process.env` lets you access them in:
        • `cypress.config.js`
        • Plugin files
        • Support files
    
    3️⃣ Example of setting environment variables
    
    // macOS / Linux terminal
    export API_KEY=abcd1234
    export DB_PASSWORD=mySecret
    
    // Windows PowerShell
    setx API_KEY abcd1234
    setx DB_PASSWORD mySecret
    
    4️⃣ Using process.env in Cypress config
    
    // cypress.config.js
    const { defineConfig } = require('cypress')
    
    module.exports = defineConfig({
      env: {
        apiKey: process.env.API_KEY,           // From OS or CI
        dbPassword: process.env.DB_PASSWORD,
        orangeHrmUrl: process.env.ORANGE_HRM_URL || 'http://localhost:8080'
      }})
    
    Here:
    process.env.API_KEY → Node reads OS environment
    Cypress.env('apiKey') → test can access it
    
    process.env cannot be read in browser tests. e.g. cy.visit(process.env("URL"))
    Cypress.env() cannot read OS (e.g. pwrshll: setx API_KEY abcd1234, linux: export API_KEY=abcd1234), or CI (vars in yml file) vars
    variables directly; it reads what you put in config.env or pass in CLI via --env flag. To access CI, OS var via Cypress.env() they need
    to be added in cypress.config.js file with process.env and to Cypress.env() via config.env. e.g. 
    module.exports = defineConfig({
      e2e: {
        setupNodeEvents(on, config) {
          // 1️⃣ Read Node.js / CI environment variables
          const apiKey = process.env.API_KEY
          const dbPassword = process.env.DB_PASSWORD
    
          // 2️⃣ Copy them into Cypress.env()
          config.env.apiKey = apiKey
          config.env.dbPassword = dbPassword

          // 3️⃣ Return config
          return config
        }}})

    Now in your test, you can safely access them:

    it('uses environment variables', () => {
    cy.visit(Cypress.env('URL'))          // value from config.env / CLI
    cy.log(Cypress.env('apiKey'))         // value copied from process.env
    })
    */

    it('IMPLICIT ASSERTIONS', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.title().should('contain', "Orange").and("include", "HRM").and("eq", "OrangeHRM");
        cy.url().should("not.contain", "cucu").should("contain", "demo").should("include", "opensource").and("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.get("[alt='orangehrm-logo']").last().should("exist").and("be.visible");
        cy.get(".oxd-text.oxd-text--p.orangehrm-copyright").eq(1).invoke("html").should("contain", "<a href") //checks class selector includes a tag with href attr
        cy.xpath("//button[@type='submit']").should("have.css", "font-size", "14px").and("not.have.value", "dombili");

        //contains() always finds element's own or its descendant's text
        cy.contains("Login").should("be.visible") // any element with 'Login' be visible
        cy.xpath("//button[@type='submit']").contains("Login").should("exist") // button that and contains text 'Login' -> exists in dom
        cy.contains('button.oxd-button', "Login").should("be.visible") //button that has button.oxd-button selector and contains text 'Login' -> visible to user
        cy.get("a").eq(1).click() //find all elements with a and select the element at index 1 (0-based)
    })


    it("random assert test", () => {

        cy.visit("https://example.cypress.io")
        cy.contains('get').click() //click any element that has text 'get'

        cy.get("#query-btn")
            .should("have.class", "query-btn")
            .should(($btn) => {
                expect($btn).to.have.attr("class")
            })
            .should("be.enabled")

        assert.equal(4, 4, 'NOT EQUAL') //passes
        assert.equal(4, '4', 'NOT EQUAL') //passes
        assert.strictEqual(4, '4', 'NOT EQUAL') //fails
        assert.equal(4, 5, 'NOT EQUAL') //fails
    })


    it.only("jQuery/prop vs attr comparison", () => {

        cy.visit("https://example.cypress.io")
        cy.contains('get').click() // click any element that has text 'get'

        // Type text into input
        cy.get("#inputName").type("cucu")

        // -------------------------------
        // 1️⃣ Using prop() to get current runtime value
        // prop() accesses the DOM property, which reflects live changes
        cy.get("#inputName").then(($input) => {
            const currentValue = $input.prop('value')
            cy.log("Current value using prop(): " + currentValue) // "cucu"
            expect(currentValue).to.equal('cucu')
        })

        // -------------------------------
        // 2️⃣ Using attr() to get original HTML attribute
        // attr() reads the HTML as written in the source, does NOT reflect user typing
        cy.get("#inputName").then(($input) => {
            const originalAttr = $input.attr('value')
            cy.log("Original HTML value using attr(): " + originalAttr) // undefined
            expect(originalAttr).to.be.undefined
        })

        // -------------------------------
        // 3️⃣ Other properties with prop()
        cy.get("#inputName").then(($input) => {
            const isDisabled = $input.prop('disabled') // false if input is enabled
            const inputType = $input.prop('type')      // 'text'
            cy.log("Is disabled? " + isDisabled)
            cy.log("Input type: " + inputType)
            expect(isDisabled).to.be.false
            expect(inputType).to.equal('text')
        })

        // -------------------------------
        // 4️⃣ Chainable assertions with should() for props
        cy.get("#inputName")
            .should('have.prop', 'value', 'cucu')   // runtime value
            .should('have.prop', 'type', 'text')
            .should('have.prop', 'disabled', false)

        /* -------------------------------
           5️⃣ Quick summary comment:
        
            .prop() -> reads DOM properties (current state, e.g., value typed by user, checked, disabled)
            .attr() -> reads HTML attributes (initial values in HTML, does NOT change when user types)
            .val()  -> jQuery shortcut to get/set input value (like prop('value'))
        */
    })


    it('EXPLICIT [BDD] ASSERTIONS', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.get("input[name='username']").type("Admin")

        cy.get("input[name='username']").then(($userInput) => {
            expect($userInput.val()).to.eq("Admin")
        })

        cy.get("input[name='password']").type("admin123")
        cy.xpath("//button[@type='submit']").click()
        let expectedName = "nims panch"

        cy.get(".oxd-userdropdown p").then(($userName) => {
            expect($userName.text().trim()).to.eq(expectedName)
        })
    })

    it('EXPLICIT [TDD] ASSERTIONS', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))
        cy.get("input[name='username']").type("Admin")
        cy.get("input[name='password']").type("admin123")
        cy.xpath("//button[@type='submit']").click()

        cy.xpath("//button[./*[@class='oxd-icon orangehrm-upgrade-icon']]").then(($upgrade) => {
            assert.equal($upgrade.text().trim(), "Upgrade")
            assert.notEqual($upgrade.text(), "seva")
        })
    })
})