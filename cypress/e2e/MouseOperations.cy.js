import 'cypress-iframe'
require('@4tw/cypress-drag-drop')

describe("Mouse Op Suite", () => {


    it("mouse over", () => {

        cy.visit("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmouseover")

        cy.frameLoaded("#iframeResult")        // ensure the correct iframe is loaded
        cy.iframe("#iframeResult")             // select only that iframe
            .find("img[onmouseover]")           // find your element
            .trigger("mouseover", { force: true }).should("have.css", "height", "64px")
    })


    it('right click', () => {

        cy.visit("https://vinothqaacademy.com/mouse-event/")

        // cy.get(".context-menu-one.btn.btn-neutral").trigger("r")

        //approach 1
        // cy.get("#rightclick").rightclick()
        // cy.get("#myDiv > ul").should("be.visible")

        //approach 2
        cy.get("#rightclick").trigger("contextmenu")
        cy.get("#myDiv > ul").should("be.visible")
    })


    it('double click', () => {

        cy.visit("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3")

        cy.frameLoaded("#iframeResult")

        //approach 1
        // cy.iframe("#iframeResult").find("button[ondblclick]").dblclick()

        //approach 2
        cy.iframe("#iframeResult").find("button[ondblclick]").trigger('dblclick')
    })


    it('drag and drop using plugin', () => {
        //npm install --save-dev @4tw/cypress-drag-drop

        cy.visit("https://demo.automationtesting.in/Static.html")
        cy.get("#dragarea div img")           // get all images in #dragarea
            .first()                             // pick the very first image in DOM order
            .should("be.visible")                // ensure it’s interactable
            .drag("#droparea")                      // drop target

        cy.get("#droparea").should("be.visible").find("img").should('exist')
    })


    it.only('scroll page', () => {

        cy.visit("https://www.w3schools.com/html/")
        cy.get("div#getdiploma").scrollIntoView().should("be.visible")
        cy.get("#main > div.w3-example > a").scrollIntoView().should("be.visible")
    })
})

