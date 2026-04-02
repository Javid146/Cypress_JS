describe('Cypress cy.clock() and cy.tick() examples', () => {

    /**
     * Test 1: Simulate a user session timeout
     * 
     * - Suppose the app logs out users after 15 minutes of inactivity.
     * - We don’t want to actually wait 15 minutes in real time.
     * - cy.clock() freezes JS timers, cy.tick() moves time forward instantly.
     */
    it('simulates 15 minute session timeout', () => {
        // Freeze all JavaScript timers
        cy.clock()

        // Visit the dashboard page
        cy.visit('/dashboard')

        // Simulate 15 minutes passing instantly
        cy.tick(15 * 60 * 1000)    // 900,000 ms

        // Assert user is logged out
        cy.get('#loginPage').should('be.visible')
    })


    /**
     * Test 2: Set a specific fixed date/time
     * 
     * - Some UI shows the current date (e.g., date input field, logs, timestamps)
     * - Instead of depending on the real system clock, we freeze it to a fixed moment
     * - This makes tests deterministic (always pass)
     */
    it('sets a fixed date using cy.clock()', () => {
        // Set the current date/time to April 14, 2021
        const now = new Date(2021, 3, 14).getTime()
        cy.clock(now)

        // Visit page with a date input
        cy.visit('/index.html')

        // The input should show the frozen date
        cy.get('#date').should('have.value', '04/14/2021')
    })
})