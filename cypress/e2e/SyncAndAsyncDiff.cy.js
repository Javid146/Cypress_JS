/* 
 * Cypress Asynchronous vs Synchronous Example
 * 
 * This file demonstrates:
 * 1️⃣ Cypress.$ = synchronous, jQuery style
 * 2️⃣ Cypress commands (cy.get, cy.click, etc.) = asynchronous, automatically retried
 * 3️⃣ Why storing Cypress commands in 'let' does not work
 * 4️⃣ How to properly use .then() and command chaining
 */

describe("Cypress Async vs Synchronous Example", () => {

    /* 
    * 1️⃣ Cypress.$ example
    * Cypress.$ is just jQuery inside Cypress
    * It is synchronous, so you get the element immediately
    * ⚠️ Only use for debugging or quick DOM queries, not recommended for real tests
    * 
    * Comparison with cy.get():
    * - Cypress.$('#myButton') → Synchronous, returns a jQuery element instantly
    *   No automatic retry, no waiting, no logging in Cypress Test Runner, not chainable, flaky results upon UI interaction (e.g. click())
    * - cy.get('#myButton') → Asynchronous, returns a Cypress chainable
    *   Automatically retries until element exists, works with Cypress logging, can chain commands
    */
    it("Cypress.$ synchronous DOM query and comparison with cy.get()", () => {
        // Using Cypress.$
        const element = Cypress.$('#myButton')
        console.log("Cypress.$ element text:", element.text())  // Works immediately

        // Using cy.get() - asynchronous
        cy.get('#myButton').then(($btn) => {
            console.log("cy.get() element text:", $btn.text())  // Works inside .then()
        })
    })

    /*
     * 2️⃣ Cypress commands are asynchronous
     * cy.get() returns a "Cypress chainable", not the element directly
     * Cypress manages retries and timing automatically
     */
    it("cy.get() is asynchronous", () => {
        const btn = cy.get('#myButton')
        console.log(btn) // ❌ undefined / does not give element yet
        // You cannot use 'btn' directly outside chain
    })

    /*
     * 3️⃣ Correct way to work with async commands
     * Use .then() or command chaining to access the resolved value
     */
    it("cy.get() with .then() works correctly", () => {
        cy.get('#myButton')
            .invoke('text')         // Extract text from the element
            .then((text) => {
                // This runs after Cypress resolves the command
                cy.log(text)           // Works! Logs button text
            })
    })

    /*
     * 4️⃣ Key differences summary
     * Cypress.$          → Synchronous, jQuery style, good for debugging only
     * cy.get()/cy.click() → Asynchronous, automatically retried, preferred for tests
     * let variables      → ❌ Does not store Cypress command results, use .then() instead
     */
})