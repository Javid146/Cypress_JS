// Import from Cypress with CommonJS. require() -> commonJS; ES module includes -> import
const { defineConfig } = require("cypress");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const xml2js = require('xml2js')

/*
ESM (es module) version of import:
import { defineConfig } from "cypress";
import { downloadFile } from "cypress-downloadfile/lib/addPlugin";
*/

module.exports = defineConfig({ // module.export -> commonJS; export default defineConfig({}) -> ES module

  /**
 * The "expose" block is used to share **public, non-sensitive configuration values**
 * from Cypress config to your tests at runtime.
 * 
 * Key points:
 * - These values are **not secret**, unlike cy.env() values from cypress.env.json.
 * - Useful for things like **feature flags, plugin settings, or runtime toggles**.
 * - Can be accessed in tests using Cypress.config().expose.<key>.
 * - Arbitrary names: featureFlag and pluginConfig are just example keys; you can name them anything.
 * - Scope: global, available in all specs; persists only while the browser is open.
 * 
 * Difference from "env":
 * - env: used for environment variables or sensitive info like API keys, credentials.
 * - expose: only for public, non-sensitive flags/config that tests can safely read.
 * 
 * Example access in tests:
 *   if (Cypress.config().expose.featureFlag) { ... }
 *   cy.log(Cypress.config().expose.pluginConfig)
 */
  expose: {
    featureFlag: true,
    pluginConfig: 'value1'
  },

  // Cypress supports two testing types:
  // 1) e2e (End-to-End testing)
  // 2) component (Component testing)
  // Everything inside "e2e" applies ONLY to E2E tests
  e2e: {
    watchForFileChanges: false,

    viewportHeight: 1920,
    viewportHeight: 1080,
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
      "runMode": 2, //when running tests with cypress run (CI/headless), retry a failed test up to 2 times
      openMode: 0 //when running with cypress open, do not retry
    },
    "env": //public data, sensitive data is kept in cypress.env.json
    {
      "orangeHrmUrl": "https://opensource-demo.orangehrmlive.com",  //how to from CLI: npx cypress run --env orangeHrmUrl=https://staging.orangehrmlive.com
      "gorestBaseUrl": "https://gorest.co.in/",
      "testAutomPracticeUrl": "https://testautomationpractice.blogspot.com/",
    },

    /*
      setupNodeEvents() runs in the Node process (backend), NOT inside the browser where tests execute. It runs once when Cypress starts.
      anything running inside of it is plugin, think of it as bridge between node.js (cypress runner) and tests in browser

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
