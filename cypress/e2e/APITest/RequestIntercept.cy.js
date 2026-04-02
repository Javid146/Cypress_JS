it("GET", () => {
  cy.request('GET', "https://jsonplaceholder.typicode.com/posts/1").its('status').should('eq', 200)
})


// This test demonstrates how to use Cypress cy.intercept() to mock (stub) a network request.
// Intercept is mainly used in UI/E2E tests to control or observe API calls made by the browser.
//
// WHY WE USE cy.intercept():
// 1. Mock backend responses so tests don't depend on real APIs.
// 2. Control returned data (predictable test results).
// 3. Test UI behavior with different responses (success, error, empty data).
// 4. Verify requests sent by the frontend.
//
// IMPORTANT:
// cy.intercept() only captures requests made from the BROWSER.
// It DOES NOT work with cy.request() because cy.request() runs in the Cypress backend (Node).
//
// Example that WILL NOT be intercepted:
// cy.request('GET','/posts/1')  ❌
//
// Intercept only works when the request is sent by the application itself
// (fetch, XMLHttpRequest, etc.).
//
// WHY cy.visit() IS NEEDED:
// Cypress must load a page first so a browser context exists.
// Without visiting a page, there is no window object and no browser network activity.
//
// WHAT cy.window() DOES:
// cy.window() gives access to the browser's global window object.
// The window object contains browser APIs such as:
// - fetch()
// - document
// - localStorage
// - location
//
// WHAT fetch() DOES:
// fetch() is a browser API used to make HTTP requests.
// It is similar to sending a GET/POST request from frontend JavaScript.
// Because fetch() runs in the browser, Cypress intercept can capture it.

it.only("GET with intercept", () => {

  // Intercept the GET request and return a mocked response instead of calling the real server
  cy.intercept(
    'GET',
    'https://jsonplaceholder.typicode.com/posts/1',
    {
      statusCode: 200,
      body: {
        userId: 1,
        id: 1,
        title: "My Stubbed Title",
        body: "Hello World"
      }
    }
  ).as('getPost')

  // Visit any page so the browser context exists
  cy.visit('https://jsonplaceholder.typicode.com')

  // Access the browser window and send a request using fetch()
  // This simulates a frontend network request that Cypress can intercept
  cy.window().then((win) => {
    win.fetch('https://jsonplaceholder.typicode.com/posts/1')
  })

  // Wait for the intercepted request and assert the mocked response
  cy.wait('@getPost').then((interception) => {
    expect(interception.response.statusCode).to.eq(200)
    expect(interception.response.body.title).to.eq("My Stubbed Title")
  })

  // Alternative assertion style:
  // cy.wait('@getPost')
  //   .its('response.statusCode')
  //   .should('eq', 200)

  // cy.wait('@getPost')
  //   .its('response.body.title')
  //   .should('eq', 'My Stubbed Title')
})