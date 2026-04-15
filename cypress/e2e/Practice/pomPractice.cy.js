import Login2 from "../../Pages/Login2"
const { MyInfoPage } = require('../../Pages/MyInfoPage')
import SidePanel from "../../Pages/SidePanelPage"
import MiscAppsElements from "../../Pages/MiscAppsElements"
const loginPage = new Login2()
const myInfo = new MyInfoPage()
const sidePanel = new SidePanel()
const miscAppsElements = new MiscAppsElements()


describe('orangeHRMTest', () => {

    beforeEach('login to app', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))

        cy.fixture('orangeHrm.json').then((data) => {

            loginPage.loginToOrange(data.username, data.password)
            cy.get('.oxd-topbar-header-breadcrumb h6').should("have.text", data.expected).its("attr", "class").then(() => { })
        })
    })

    afterEach('log out app', () => {
        loginPage.logoutApp()
    })


    it('verify employee personal details', () => {

        sidePanel.clickSidePanelBtn("MyDetails")
        myInfo.clickEmployeeTabList("Personal Details")
        myInfo.verifyEmployeeNameHeaderCorrect()
    })
})


const dataset = require('../../fixtures/orangeHrm2.json')

context('orangeHRMTest negative/positive test', () => {

    beforeEach('login to app', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))
    })

    dataset.forEach((data) => {

        specify(`verify if login is validLogin: ${data.validLogin}`, () => {

            loginPage.loginToOrange(data.username, data.password)

            if (data.validLogin === true) {
                cy.get('.oxd-topbar-header-breadcrumb h6').should("have.text", data.expected)
            }
            else {
                cy.get(".oxd-alert-content > .oxd-text").should("have.text", "Invalid credentials")
            }
        })
    })
})


context('iframe test', () => {

    it('iframe 1', () => {

        cy.visit("https://vinothqaacademy.com/iframe")

        const newEmployee = ["javid", "ceo", "jmammadli@jm.com", "Baku", "all"]
        miscAppsElements.enterEmployeeDetails(newEmployee)
        miscAppsElements.verifyEmployeeRowAdded(newEmployee)
    })
})


context('shadow test', () => {

    it('iframe 1', () => {

        cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm")

        miscAppsElements.browserAndUploadFile("orangeHrm.json")
    })
})


describe.only('styles test', () => {

    beforeEach('login to app', () => {

        cy.visit(Cypress.env('orangeHrmUrl'))

        cy.fixture('orangeHrm.json').then((data) => {

            loginPage.loginToOrange(data.username, data.password)
        })
    })

    it('test 1', {
        browser: 'edge',
        viewportHeight: 900,
        viewportWidth: 1200
    }, () => {
        // miscAppsElements.verifyStylesofStopWatch()
        // miscAppsElements.verifyPieChart()
        // miscAppsElements.verifyChartLegend()
        // miscAppsElements.getGridItemCount()

        const menuItems = ["Admin", "PIM", "Leave", "Time", "Recruitment", "My Info", "Performance", "Dashboard", "Directory", "Maintenance", "Claim", "Buzz"]
        miscAppsElements.verifyMenuItems(menuItems)
    })
})

