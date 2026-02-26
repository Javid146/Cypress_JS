describe('Assertion Suite', () => {

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

        // -------------------------------
        // 5️⃣ Quick summary comment:
        /*
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