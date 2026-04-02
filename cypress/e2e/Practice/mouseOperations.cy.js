require('@4tw/cypress-drag-drop')
import "cypress-real-events/support"
import 'cypress-iframe'


it('double click', () => {

    cy.visit("https://vinothqaacademy.com/mouse-event/")
    cy.get("#doubleBtn").trigger("dblclick").should("have.text", "Success!")

    cy.reload()
    cy.get("#doubleStatus").should("have.text", "Waiting...")
    cy.get("#doubleBtn").dblclick()
    cy.get("#doubleStatus").should("include.text", "Double Click Detected")
})


it('right click', () => {

    cy.visit("https://vinothqaacademy.com/mouse-event/")

    cy.get("#rightStatus").should("have.text", "Waiting...")

    //approach 1
    // cy.get("#rightBtn").rightclick()

    //approach 2
    cy.get("#rightBtn").trigger("contextmenu")

    let actionBtns = ["Edit", "Copy", "Delete"]

    cy.get("#contextMenu")
        .should("be.visible")
        .find("button[data-action]")
        .each((btnText, index) => {
            cy.wrap(btnText).should("have.text", actionBtns[index])
        })

    cy.get("#rightStatus").should("include.text", "Menu opened")
})


it('drag', () => {

    cy.visit("https://vinothqaacademy.com/mouse-event/")

    cy.get("#dragStatus").should("have.text", "Waiting...")

    cy.get("#dragItem").drag("#dropZone")
    cy.get("#dragStatus").should("include.text", "Dropped Successfully")
})


it("mouse over", () => {

    cy.visit("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmouseover")

    cy.frameLoaded("#iframeResult")        // ensure the correct iframe is loaded
    cy.iframe("#iframeResult")             // select only that iframe
        .find("img[onmouseover]")           // find your element
        .trigger("mouseover", { force: true }).should("have.css", "height", "64px")
})

it.only('hover over', () => {

    cy.visit("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onmouseover")

    //approach 1 - trigger("mouseover")
    //require('@4tw/cypress-drag-drop')
    // cy.frameLoaded("#iframeResult")
    // cy.iframe("#iframeResult")
    //     .find("img[onmouseover]")
    //     .scrollIntoView()
    //     .trigger("mouseover", { force: true }).should("have.css", "height", "64px")

    //approach 2 - trigger("mouseover")
    //npm install cypress-real-events -> import "cypress-real-events/support"
    cy.frameLoaded("#iframeResult")
    cy.iframe("#iframeResult")
        .find("img[onmouseover]")
        .scrollIntoView()
        .realHover().should("have.css", "height", "64px")
})


it('slider', () => {

    cy.visit("https://vinothqaacademy.com/mouse-event/")

    cy.get("#slider").then(($slider) => {

        const width = $slider.width()

        cy.get("#handle_max")
            .trigger("mousedown", { which: 1 }) //1 = left click, 2 = middle click, 3 = right click
            .trigger("mousemove", { clientX: width * 0.999 }) //width * 0.99 = move 99% horizontally from base of slider, 
            .trigger("mouseup")
    })

    cy.get("#handle_max")
        .should(($el) => {
            const val = Number($el.attr("aria-valuenow"))
            expect(val).to.be.gte(2500) //gte is >= ; lte is <= ; within(200,300) is obvious
        })

    cy.get("#sliderStatus").should("include.text", "Value: £25")
})