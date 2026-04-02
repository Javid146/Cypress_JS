describe("aliases/hooks/tags", () => {

    //HOOKS: before(), after(), beforeEach(), afterEach()
    //TAGS: skip, only

    /* 
     * Key points:
     * 1️⃣ describe() = context() → test group / scenario grouping
     * 2️⃣ it() = specify() → individual test case
     * 3️⃣ You can nest describe/context as many times as you want
     * 4️⃣ Each describe/context can have multiple it/specify tests
     */

    describe("Feature: Login Flow", () => {

        /** Nested scenario using context() */
        context("Scenario: Valid credentials", () => {

            it("logs in successfully using it()", () => {
                cy.log("Test: login with valid credentials")
            })

            specify("redirects to dashboard using specify()", () => {
                cy.log("Test: redirected to dashboard")
            })
        })
    })


    context("Feature: Login Flow", () => {

        /** Nested scenario using context() */
        describe("Scenario: Valid credentials", () => {

            it("logs in successfully using it()", () => {
                cy.log("Test: login with valid credentials")
            })

            specify("redirects to dashboard using specify()", () => {
                cy.log("Test: redirected to dashboard")
            })
        })
    })

    describe("Feature: Login Flow", () => {

        context("Scenario: Valid credentials", () => {

            it("logs in successfully", () => {
                // Test steps:
                // 1. Enter valid username/password
                // 2. Click login
                // 3. Assert user is logged in
            })

            it("redirects to dashboard", () => {
                // Test steps:
                // 1. Login with valid credentials
                // 2. Assert current URL is /dashboard
            })
        })


        context("Scenario: Invalid credentials", () => {

            it("shows error for wrong password", () => {
                // Test steps:
                // 1. Enter valid username + wrong password
                // 2. Click login
                // 3. Assert error message is displayed
            })

            it("shows error for wrong username", () => {
                // Test steps:
                // 1. Enter wrong username + valid password
                // 2. Click login
                // 3. Assert error message is displayed
            })
        })

    })


    before(() => {
        cy.log("************************************* Launch App *************************************")
    })

    after(() => {
        cy.log("************************************* Close App *************************************")
    })

    beforeEach(() => {
        cy.log("************************************* Login *************************************")
    })

    afterEach(() => {
        cy.log("************************************* Logout *************************************")
    })


    it.skip("", () => {

    })


    it.only("", () => {

    })
})