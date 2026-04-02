it.only('alert', () => {

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

    cy.get("[onclick='jsAlert()']").debug().click()

    cy.on("window:alert", (alertTxt) => {

        expect(alertTxt).to.eq("I am a JS Alert")
    })

    cy.get("#result").should("have.text", "You successfully clicked an alert")
})


it('confirm', () => {

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

    cy.window().then((alertWind) => {

        cy.stub(alertWind, "confirm")
            .onFirstCall().returns(true)
            .onSecondCall().returns(false)
            .as("confirmAliconfirmStubas")
    })

    cy.get("[onclick='jsConfirm()']").click()
    cy.get("[onclick='jsPrompt()']").click()
    cy.get("@confirmAliconfirmStubas").should("have.been.calledOnce")
    cy.get("@confirmAliconfirmStubas").should("have.been.calledWith", "I am a JS Confirm") //reads text on alert popup
    cy.get("#result").should("be.visible").and("have.text", "You clicked: Ok")

    cy.get("[onclick='jsConfirm()']").click()
    cy.get("@confirmAliconfirmStubas").should("have.been.calledTwice")
    cy.get("#result").should("be.visible").and("have.text", "You clicked: Cancel")
})


it('prompt', () => {

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

    cy.window().then((alertPop) => {

        cy.stub(alertPop, "prompt")
            .onFirstCall().returns("cucu")
            .onSecondCall().returns(null)
            .as('promptAlias')
    })

    cy.get("[onclick='jsPrompt()']").click()
    cy.get("#result").should("be.visible").and("have.text", "You entered: cucu")

    cy.get("[onclick='jsPrompt()']").click()
    cy.get('@promptAlias').should("have.been.calledTwice").and("have.been.calledWith", "I am a JS prompt")
    cy.get("#result").should("be.visible").and("have.text", "You entered: null")
})