import 'cypress-iframe'

describe('Iframes', () => {


    it('approach 1 - explicit approach', () => {
        cy.visit("https://vinothqaacademy.com/iframe/")

        cy.get("[name='employeetable']").its("0.contentDocument.body").should("be.visible") //load frame
            .then(cy.wrap)
            .find("#nameInput")
            .clear().type("cucu")
            .should("have.value", "cucu")
    })

    it('approach 2 - saved custom command in commands.js', () => {
        cy.visit("https://vinothqaacademy.com/iframe/")

        cy.iframeCommand("[name='employeetable']").find("#nameInput").type("cucu").should("have.value", "cucu")
        cy.iframeCommand("[name='employeetable']").find("#roleInput").type("nimka").should("have.value", "nimka")
        cy.iframeCommand("[name='employeetable']").find("#emailInput").type("nimkac@gmail").should("have.value", "nimkac@gmail")
        cy.iframeCommand("[name='employeetable']").find("#locationInput").type("Baku").should("have.value", "Baku")
        cy.iframeCommand("[name='employeetable']").find("#departmentInput").type("music").should("have.value", "music")
        cy.iframeCommand("[name='employeetable']").find("#addBtn").click()

        cy.iframeCommand("[name='employeetable']").find("#myTable tr:last-child td:nth-child(2)").then((submitted) => {

            const text = submitted.text()
            cy.log("logged cucu :", text)
            expect(submitted.text()).to.eq("cucu")
        })
    })

    /*
    1. install plugin: npm install -D cypress-iframe
    2. import 'cypress-iframe'
    */
    it('approach 3 - iframe plugin', () => {
        cy.visit("https://vinothqaacademy.com/iframe/")

        cy.frameLoaded("[name='employeetable']")    //load frame with plugin

        const firstName = "seva"
        cy.iframe("[name='employeetable']").find("#nameInput").type(firstName).should("have.value", firstName)
        cy.iframe("[name='employeetable']").find("#roleInput").type("nizi").should("have.value", "nizi")
        cy.iframe("[name='employeetable']").find("#emailInput").type("sevani@gmail").should("have.value", "sevani@gmail")
        cy.iframe("[name='employeetable']").find("#locationInput").type("Baku").should("have.value", "Baku")
        cy.iframe("[name='employeetable']").find("#departmentInput").type("knitting").should("have.value", "knitting")
        cy.iframe("[name='employeetable']").find("#addBtn").click()

        cy.iframe("[name='employeetable']").find("#myTable tr:last-child td:nth-child(2)").then(($cell) => {

            assert.equal($cell.text(), firstName)
        })
    })
})