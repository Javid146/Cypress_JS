// Import defineConfig helper from Cypress
const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const xml2js = require('xml2js')

module.exports = defineConfig({

  // Cypress supports two testing types:
  // 1) e2e (End-to-End testing)
  // 2) component (Component testing)
  // Everything inside "e2e" applies ONLY to E2E tests
  e2e: {
    watchForFileChanges: false,

    // Allows Cypress commands like cy.get() to search inside Shadow DOM
    // Needed when your application uses Web Components
    includeShadowDom: true,

    // Records a video of the test run
    // Videos are created ONLY when running: `npx cypress run`
    // (Not created when using `npx cypress open`)
    video: true,

    // Default timeout for most Cypress commands like cy.get(), cy.click(), etc.
    defaultCommandTimeout: 10000, // 10 seconds

    // Default timeout for page load
    pageLoadTimeout: 60000, // 60 seconds

    // Default timeout for assertions like .should()
    responseTimeout: 15000,
    // Replaces Cypress's default reporter with mochawesome reporter
    // This enables HTML/JSON report generation after test execution
    reporter: 'cypress-mochawesome-reporter',
    retries:
    {
      "runMode": 2
    },
    "env":
    {
      "orangeHrmUrl": "https://opensource-demo.orangehrmlive.com",  //how to from CLI: npx cypress run --env orangeHrmUrl=https://staging.orangehrmlive.com
      "gorestBaseUrl": "https://gorest.co.in/"
    },

    /*
      setupNodeEvents() runs in the Node process (backend), NOT inside the browser where tests execute. It runs once when Cypress starts.

      This is used to:
      - Register plugins
      - Listen to Cypress lifecycle events
      - Add custom tasks
      - Modify configuration dynamically

      Parameters:
      - on: used to register event listeners (on('event', callback));     on = “Let me attach event hooks”
      - config: the resolved Cypress configuration object;                config = “Let me change settings before tests start”
    */
    setupNodeEvents(on, config) {

      // Registers the mochawesome reporter plugin
      // This enables the reporter to:
      // - Hook into test lifecycle events
      // - Collect results
      // - Generate report files after execution
      require('cypress-mochawesome-reporter/plugin')(on)
      on('task', { downloadFile })

      on('task', {
        parseXml(xml) {
          const parser = new xml2js.Parser({ explicitArray: false })
          return parser.parseStringPromise(xml)
        }
      })
    },
  }
});
