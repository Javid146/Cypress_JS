require('cypress-xpath')

export default class MiscAppsElements {

    inputLocators = ["#nameInput", "#roleInput", "#emailInput", "#locationInput", "#departmentInput"]

    shadowLocator = "smart-ui-file-upload.smart-ui-component"
    fileUploadInput = "input.smart-browse-input"
    fileUploadContainer = "div.smart-file-upload-container"
    fileName = "div.smart-file span"
    stopwatchBtn = "//i[@class='oxd-icon bi-stopwatch']/.."
    chartWidget = "div.emp-distrib-chart"
    chartLegend = "ul.oxd-chart-legend"
    quickLaunchGrid = ".oxd-grid-3.orangehrm-quick-launch"
    sideBarMenuItems = "ul.oxd-main-menu li span"


    enterEmployeeDetails(employeeData) {

        this.inputLocators.forEach((locator, index) => {
            this.typeIntoInput(locator, employeeData[index])
        })
    }

    typeIntoInput(locatorId, text) {
        cy.iframeForTest("[name='employeetable']").find(locatorId).type(text).should("have.value", text)
    }

    verifyEmployeeRowAdded(employeeData) {
        cy.iframeForTest("[name='employeetable']").find("#addBtn").click()

        cy.iframeForTest("[name='employeetable']").should("be.visible").find("#myTable tr").last().find("td").each((tdInput, index) => {

            if (index === 0) return
            expect(tdInput.text().trim()).to.equal(employeeData[index - 1])
        })
    }

    browserAndUploadFile(fileNameText) {
        cy.shadowElement(this.shadowLocator).find(this.fileUploadInput).attachFile(fileNameText)
        cy.shadowElement(this.shadowLocator).find(this.fileUploadContainer).should("be.visible")
        cy.shadowElement(this.shadowLocator).find(this.fileName).should("be.visible").and("have.text", fileNameText)
    }

    verifyStylesofStopWatch() {
        cy.xpath(this.stopwatchBtn).invoke("css", "background-color").should("include", "255, 123, 29")
        cy.xpath(this.stopwatchBtn).should("have.attr", "type", "button")
        cy.xpath(this.stopwatchBtn).invoke("attr", "class").should("exist").and("include", "oxd-icon-button")
        cy.xpath(this.stopwatchBtn).invoke("attr", "class").should("exist").and("include", "oxd-icon-button")
        cy.xpath(this.stopwatchBtn).invoke("children").first().should("exist").and("have.class", "oxd-icon bi-stopwatch")
        cy.xpath(this.stopwatchBtn).invoke("parent").should("exist").and("have.class", "orangehrm-attendance-card-bar")
        cy.xpath(this.stopwatchBtn).invoke("parents").first().should("exist").and("have.class", "orangehrm-attendance-card-bar")
        cy.xpath(this.stopwatchBtn).siblings().first().invoke("prop", "tagName").and("match", /span/i) //regex, ignorecase
        cy.xpath(this.stopwatchBtn).invoke("siblings").first().invoke("prop", "tagName").then((tag) => {
            expect(tag.toLowerCase()).to.eq("span") //or
        })
    }

    verifyPieChart() {
        cy.get(this.chartWidget).eq(1).should("be.visible").find("DIV").should("have.class", "oxd-pie-chart")
        cy.get(this.chartWidget).eq(1).should("be.visible").children().first().invoke("prop", "tagName").should("eq", "DIV")
        cy.get(this.chartWidget).eq(1).should("be.visible").children().first().invoke("prop", "tagName").then((tag) => {
            expect(tag.toLowerCase()).to.equal("div")
        })
        cy.get(this.chartWidget).eq(1).should("be.visible").children().first().find("canvas").should("have.attr", "height", "265")
        cy.get(this.chartWidget).eq(1).should("be.visible").children().first().find("canvas").invoke("attr", "style").should("contain", "display: block; box-sizing: border-box;")
        cy.get(this.chartWidget).eq(1).should("be.visible").children().first().find("canvas").invoke("attr", "style").should("include", "display: block; box-sizing: border-box;")
        cy.get(this.chartWidget).eq(1).should("be.visible").children().first().find("canvas").invoke("css", "scrollbar-color").should("include", "rgb(207, 211, 222)")

    }

    verifyChartLegend() {
        cy.get(this.chartLegend).find("li").first().scrollIntoView()
        cy.get(this.chartLegend).find("li").its("length").should("be.gte", 2)
        cy.get(this.chartLegend).find("li").its("length").should("be.above", 2)
        cy.get(this.chartLegend).find("li").its("length").should("be.at.least", 2)
        cy.get(this.chartLegend).find("li").eq(1).children().its("length").should("eq", 2)
        cy.get(this.chartLegend).find("li").eq(1).should("be.visible").find("span").last()
            .should("have.class", "oxd-text")
            .and("have.css", "color", "rgb(100, 114, 140)")
            .should("have.attr", "title")

        cy.get(this.chartLegend).find("li").eq(1).children().last().invoke("text").should("eq", "Human Resources")
        cy.get(this.chartLegend).find("li").eq(1).children().last().should("have.text", "Human Resources")
    }

    getStopWatchbtn() {
        return cy.xpath(this.stopwatchBtn)
    }

    /*
        Looping DOM elements? → use .each()
        Looping data? → use for...of
        */
    getGridItemCount() {
        return cy.get(this.quickLaunchGrid).scrollIntoView().find("div.oxd-grid-item").its("length")
    }

    verifyMenuItems(menuItemArray) {

        cy.get(this.sideBarMenuItems).each((item, index) => {
            cy.wrap(item).should("be.visible").and("contain.text", menuItemArray[index]).invoke("text").should("contain", menuItemArray[index])
        })
    }
}

