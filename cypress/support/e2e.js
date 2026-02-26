// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

//if you remove this line custom commands in commands.js won't load
import './commands'

//adds support for xpath usage
require('cypress-xpath')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes('angular is not defined')) {
    return false
  }
})

//catch exception in test to prevent failure
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

/*
'cypress-mochawesome-reporter/register' runs in the browser side, inside Cypress test runtime.
This is required because:
The reporter must listen to test events (pass/fail)
It needs to capture screenshots
It attaches metadata to test results
*/
import 'cypress-mochawesome-reporter/register'

beforeEach(() => {
  cy.log("run this before each test in project")
})