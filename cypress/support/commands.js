// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Tells TypeScript (or your editor) to load Cypress type definitions.
// Makes the editor understand all Cypress commands like:
// cy.visit()
// cy.get()
// cy.click()
/// <reference types="cypress" />

// Adds type definitions for the cypress-xpath plugin.
// After this, your editor knows you can do:
// cy.xpath("//input[@name='username']").type("Admin")
/// <reference types="cypress-xpath" /> 



// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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

require('cypress-downloadfile/lib/downloadFileCommand')