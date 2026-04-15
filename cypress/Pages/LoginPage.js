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
  - "export default Login" marks this class as the primary export (ESM way)
  - When importing elsewhere, you can do: import Login from './Login'  // NO curly braces needed
  - Curly braces {} are ONLY used when importing named exports
    For example, if the file had: export const helper = () => {} 
    You would import it like:import { helper } from './Login' // MUST use {}
  - You can have multiple named exports, but only ONE default export per file
*/

export default Login;

/*
class Login {}
export default Login -> Exports class as the default export. You must create an instance when using:
import Login from './LoginPage'
const loginPage = new Login() -> instance

or: export default class Login {} -> Same as above, but inline class definition
import:
import Login from './LoginPage'
const loginPage = new Login()


or: export default new Login() -> Exports a singleton object (an instance of Login). You do NOT need to use new when importing
import loginPage from './LoginPage'
loginPage.login('Admin', 'admin123')  

SUMMARY:

| Syntax                          | Exports            | Must use `new`?   | Can create multiple instances?  | Use case                                  |
| ------------------------------- | ------------------ | ---------------   | ------------------------------  | ----------------------------------------- |
| `export default Login`          | Class              | ✅ Yes           | ✅ Yes                          | Flexible, allows multiple objects         |
| `export default class Login {}` | Class              | ✅ Yes           | ✅ Yes                          | Same as above, inline                     |
| `export default new Login()`    | Object (singleton) | ❌ No            | ❌ Only one                     | Simple Cypress Page Object, cleaner tests | bad for parallel runs





same class with CommonJS version:
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

module.exports = Login; 

or export named class with inline code: module.exports = class Login {}
or export anonymous class with inline code: module.exports = class {}

Then you would import all 3 above same way in test file:
const Login = require('./LoginPage');
const loginPage = new Login()






Multiple classes in one file with CommonJS:
class Login {
  submit(user, pwd) {
    console.log(`Logging in with ${user} / ${pwd}`);
  }
}

class Dashboard {
  goToReports() {
    console.log("Navigating to Reports page");
  }
}

// Named exports via object
module.exports = { Login, Dashboard }


Import:
const { Login, Dashboard } = require('./Pages');
const loginPage = new Login();
loginPage.submit('admin', 'admin123');

const dashboardPage = new Dashboard();
dashboardPage.goToReports();






Multiple classes in one file (ESM):
// Pages.js

export class Login {
  submit(user, pwd) {
    console.log(`Logging in with ${user} / ${pwd}`);
  }
}

export class Dashboard {
  goToReports() {
    console.log("Navigating to Reports page");
  }
}


Import:
import { Login, Dashboard } from './Pages.js';
const loginPage = new Login();
loginPage.submit('admin', 'admin123');

const dashboardPage = new Dashboard();
dashboardPage.goToReports();







ESM allows one default export per file, but you can still combine it with named exports:
export default class Login {
  submit(user, pwd) { console.log(user, pwd); }
}

export class Dashboard {
  goToReports() { console.log("Reports"); }
}


Import:
import Login, { Dashboard } from './Pages.js';
const loginPage = new Login();
const dashboardPage = new Dashboard();





Quick comparison
Module system	                          Export	                                                                             Import
ESM default	                            export default Login	                                                               import Login from './file'
ESM named	                              export class Login {}	import { Login } from './file'
CommonJS single	                        module.exports = Login	                                                             const Login = require('./file')
CommonJS object	desctructure            module.exports = { Login }	                                                         const { Login } = require('./file')
*/

