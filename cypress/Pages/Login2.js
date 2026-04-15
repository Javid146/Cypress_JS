export default class Login2 {

    username = "[name='username']"
    pwd = "[name='password']"
    submit = "button[type='submit']"
    dropdownMenu = ".oxd-dropdown-menu"

    loginToOrange(user, password) {
        cy.get(this.username).type(user)
        cy.get(this.pwd).type(password)
        cy.get(this.submit).click()
    }

    logoutApp() {
        this.clickUserDropdownMenuBtn('Logout')
    }

    clickUserDropdownMenuBtn(btnName) {
        cy.get(".oxd-userdropdown-tab").click()
        cy.get(this.dropdownMenu).should("be.visible").contains("a", btnName).click()
    }
}