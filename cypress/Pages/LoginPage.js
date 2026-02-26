class Login {

    username = "input[name='username']"
    pwd = "input[name='password']"
    submitBtn = "button[type='submit']"
    dashboard = "div.oxd-topbar-header-title h6:first-of-type"

    submitOrangeHrmCreds(user, pwd) {
        cy.get(this.username).type(user)
        cy.get(this.pwd).type(pwd)
        cy.get(this.submitBtn).click()
    }

    verifyLogin() {
        cy.get(this.dashboard).should("have.text", "Dashboard")
    }
}

/*
  Export the Login class as the default export of this module
  - "export default Login" marks this class as the primary export
  - When importing elsewhere, you can do: import Login from './Login'  // NO curly braces needed
  - Curly braces {} are ONLY used when importing named exports
    For example, if the file had: export const helper = () => {}
    You would import it like:import { helper } from './Login' // MUST use { }
  - You can have multiple named exports, but only ONE default export per file
*/

export default Login;

/*
export default Login -> Exports class as the default export. You must create an instance when using:
import Login from './LoginPage'
const loginPage = new Login()
 

or: export default class Login {} -> Same as above, but inline class definition
Same usage:
import Login from './LoginPage'
const loginPage = new Login()


or: export default new Login() -> Exports a singleton object (an instance of Login). You do NOT need to use new when importing
import loginPage from './LoginPage'
loginPage.login('Admin', 'admin123')  // call directly

SUMMARY:

| Syntax                          | Exports            | Must use `new`?   | Can create multiple instances?  | Use case                                  |
| ------------------------------- | ------------------ | ---------------   | ------------------------------  | ----------------------------------------- |
| `export default Login`          | Class              | ✅ Yes           | ✅ Yes                          | Flexible, allows multiple objects         |
| `export default class Login {}` | Class              | ✅ Yes           | ✅ Yes                          | Same as above, inline                     |
| `export default new Login()`    | Object (singleton) | ❌ No            | ❌ Only one                     | Simple Cypress Page Object, cleaner tests |
*/
