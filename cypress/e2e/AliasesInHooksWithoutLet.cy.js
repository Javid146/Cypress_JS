/**
 * Example: Using `let` to store fixture data.
 * 
 * ❌ This is not recommended in Cypress because:
 * - Cypress commands like `cy.fixture()` are asynchronous.
 * - Using `let` mixes async Cypress commands with normal JS variables.
 * - Works in simple cases, but can break in more complex tests.
 * 
 * Alias (`as()`) is preferred because Cypress manages async timing automatically.
 */
describe('wrong use of let with alias', () => {

    let user

    before(() => {
        cy.fixture('users.json').then((data) => {
            user = data
        })
    })

    it('test', () => {
        cy.log(user.name)
    })
})


/**
 * Recommended: Use `before` hook with alias and `function()` syntax not () =>.
 * 
 * ✅ Why `function()` is required:
 * - Aliases are stored in the Mocha test context (`this`).
 * - Arrow functions `() => {}` do not bind `this`, so `this.users` would be undefined.
 * 
 * ❌ Will fail with multiple tests if using `before()` and accessing `this.users` in the second test,
 * because aliases are reset before each test and `before()` only runs once.
 * 
 * Two ways to access alias from hook:
 * 1. `this.users` → requires `function()`
 * 2. `cy.get('@users')` → works with arrow functions and re-evaluates the query every time
 */
context('recommended use of before hook with alias', () => {

    before(function () {
        cy.fixture('users.json').as('users')
    })

    specify('test', function () {
        cy.log(this.users.name)
    })
})


/**
 * Recommended: Use alias with `cy.get('@alias')` instead of `this`.
 * 
 * ✅ Advantages:
 * - Works with arrow functions.
 * - Accessing the alias always re-evaluates the Cypress query.
 * - Avoids `this` context issues.
 */
context('recommended use of before hook with alias 2', () => {

    before(() => {
        cy.fixture('users.json').as('users')
    })

    it('test', () => {
        cy.get('@users').then((users) => {
            cy.log(users.name)
        })
    })
})


/**
 * Recommended: Use `beforeEach` hook to set alias for every test.
 * 
 * ✅ Why this works with multiple tests:
 * - Cypress resets aliases before each test.
 * - `beforeEach()` runs before every test, so alias is recreated each time.
 * - Safe pattern for multiple tests in one spec file.
 */
context('recommended use of beforeEach hook with alias', () => {

    beforeEach(function () {
        cy.fixture('users.json').as('users')
    })


    it('test1', function () {
        cy.log(this.users)   // ✅ works
    })


    it('test2', function () {
        cy.log(this.users)   // ✅ works
    })
})


/**
 * Example: Wrong use of `before` hook with alias and multiple tests.
 * 
 * ❌ Problem:
 * - Aliases are reset before each test in Cypress.
 * - `before()` runs only once.
 * - Only the first test sees `this.users`.
 * - The second test gets undefined.
 * 
 * ✅ Lesson:
 * - Use `beforeEach()` for aliases if you have more than one test.
 * - Alternatively, use `cy.get('@users')` to re-query the alias.
 */
describe('wrong use of before hook with alias', () => {

    before(() => {
        cy.fixture('users.json').as('users')
    })

    specify('test1', function () {
        cy.log(this.users) // works
    })

    it('test2', function () {
        cy.log(this.users) // ❌ undefined
    })
})