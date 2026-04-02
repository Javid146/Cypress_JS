describe('When NOT in Chrome', { browser: '!chrome' }, () => {
    it('runs only in non-Chrome browsers', () => {
        cy.log('This test will not run in Chrome')
    })
})


describe('When in Firefox', {
    browser: 'firefox',
    viewportWidth: 1024,
    viewportHeight: 700
}, () => {
    it('runs only in Firefox with custom viewport', () => {
        cy.log('This test runs in Firefox with 1024x700 viewport')
    })
})


describe('Login Feature', () => {

    context('Mobile Firefox', { browser: 'firefox', viewportWidth: 375, viewportHeight: 667 }, () => {
        it('shows responsive login page', () => { })
    })

    context('Desktop Chrome', { browser: 'chrome', viewportWidth: 1280, viewportHeight: 800 }, () => {
        it('shows full desktop layout', () => { })
    })
})