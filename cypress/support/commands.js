// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/*
/// <reference types="cypress" /> 
Tells TypeScript (or your editor) to load Cypress type definitions.
Makes the editor understand all Cypress commands like: cy.visit(), cy.get(), cy.click()
The three slashes indicate: this is not a normal comment; it’s a compiler directive. They must go at the very top of the file — before any code.
Purpose: Tells your editor (vsCode) about cy.xpath() for:Autocomplete, Type checking / no TS errors
Without it: cy.xpath() still works at runtime (because of require), but your editor might highlight it as unknown or give errors.
not required but makes test run smoothly.
require('cypress') → required at commands.js or e2e.js so cy.xpath() actually works when your tests run.
*/
/// <reference types="cypress" /> 

// Adds type definitions for the cypress-xpath plugin.
// After this, vsCode knows you can do: cy.xpath("//input[@name='username']").type("Admin")
/// <reference types="cypress-xpath" /> 

//adds support for xpath usage
require('cypress-xpath')  //commonJS way

/*
-- This is a parent command --
Cypress.Commands.add('login', (email, password) => { ... })

-- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
example if you created custom command: Cypress.Commands.add('customDismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
in test can use it as cy.get('<locator>').customDismiss() or directly cy.customDismiss(). customDismiss() can be called without depending on previous element. 
Therefore: { prevSubject: 'optional'}

-- This is a child command --
Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
example if you created custom command: Cypress.Commands.add('customDismiss2', { prevSubject: 'optional'}, (subject, options) => { ... })
in test can use it MUST be used as cy.get('<locator>').customDismiss2(). Previous element is required. Direct use is not allowed: cy.customDismiss2(). 
Therefore: { prevSubject: 'element'}
cy.get('.modal').customDismiss2({ force: true }); cy.get('.modal') -> subject is argument of .modal element; force -> options is additional argument of force

-- This will overwrite an existing command --
Cypress.Commands.overwrite('visit', (originalFn, options) => { ... })
example override original cy.visit() function: 
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  console.log('Visiting', url);
  return originalFn(url, options); // must call the original function
});

implement:
cy.visit('https://example.com', { timeout: 10000 });

originalFn → originalFn represents the original Cypress command. Its parameter name can be anything, 
but you need to call it if you want to overwrite original command behavior.
timeout: 10000 -> options
*/

Cypress.Commands.add("iframeCommand", (frameLocator) => {

    return cy.get(frameLocator).its("0.contentDocument.body").should("be.visible")
        .then(cy.wrap)
})

Cypress.Commands.add('clickLaptopLink', (name) => {
    cy.get("#laptops a").contains(name, { matchCase: false }).click()
})

Cypress.Commands.add("loginOrangeHrm", (user, pwd) => {
    cy.get("input[name='username']").clear().type(user)
    cy.get("input[name='password']").clear().type(pwd)
    cy.get("button[type='submit']").click()
})

Cypress.Commands.add('clickLaptopLnk', (laptopName) => {
    cy.get("#" + laptopName).click()
})

//allows to call cy.downloadfile() command. because it is already a registered task in config.js file. 
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('iframeForTest', (frameLocator) => {
    return cy.get(frameLocator).its("0.contentDocument.body").should('not.be.empty').then(cy.wrap)
})

Cypress.Commands.add('shadowElement', (locator) => {
  return cy.get(locator).shadow()
})

