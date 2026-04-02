it.only('debug/pause', () => {

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")

    /*
    debug() = JavaScript debugger in the browser DevTools
    1. debug logs found element in console, if devtools are NOT open
    2. debug logs found element and pauses execution until you click play btn to resume if devtools are open

    pause() just pauses test totally until you click resume button in cy runner browser
    tester can open devtools and inspect page and interact with UI manually
    */
    // cy.get("[onclick='jsAlert()']").debug().click()
    cy.get("[onclick='jsAlert()']").pause().click()

})