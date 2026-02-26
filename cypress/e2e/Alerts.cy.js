describe("alert suite", () => {

    //by default cypress closes alerts by clicking ok. but if you want to close alert with cancel but then you need to write an event

    it('normal alert', () => {

        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

        cy.get("button[onclick='jsAlert()']").click()
        cy.on("window:alert", ($text) => {
            expect($text).to.eq("I am a JS Alert")
        })

        cy.get("#result").should("have.text", "You successfully clicked an alert")
    })

    it('confirmation alert', () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

        cy.get("button[onclick='jsConfirm()']").click()

        //**************************** either run these 3 lines *******************************************/
        // cy.on("window:confirm", (alert) => {
        //     expect(alert).to.contain("I am a JS Confirm")
        // })
        // cy.get("#result").should("have.text", "You clicked: Ok")

        //**************************** or run these 2 lines *******************************************/
        cy.on("window:confirm", () => false)                         //this clicks cancel button on confirm alert
        cy.get("#result").should("have.text", "You clicked: Cancel")
    })

    it('prompt alert', () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

        cy.window().then((win) => {
            cy.stub(win, "prompt").returns("cucu")
        })

        cy.wait(500)
        cy.get("button[onclick='jsPrompt()']").click()
        cy.get("#result").should("have.text", "You entered: cucu")
    })

    it('authenticated alert', () => {
        // cy.visit("https://the-internet.herokuapp.com/basic_auth", { auth: { username: "admin", password: "admin" } })

        cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth")  //or above version

        cy.get("div p").should("contain", "Congratulations!")

        cy.get("div p").then(($el) => {
            expect($el.text()).to.contain("Congratulations!")
        })

        cy.get("div p").then(($el2) => {
            assert.include($el2.text(), "Congratulations!")
        })
    })
})
