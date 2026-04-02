import 'cypress-file-upload'

it('upload 1 - attachFile()', () => {

    cy.visit("https://the-internet.herokuapp.com/upload")
    cy.get("#file-upload").attachFile('APT-Protocols-Report.pdf')
    cy.get('#file-submit').click()
    cy.get("#uploaded-files").should('be.visible').and('include.text', "APT-Protocols-Report.pdf")
})


it('upload 2 - attachFile(drag)', () => {

    cy.visit("https://the-internet.herokuapp.com/upload")

    cy.get("#file-upload").attachFile({
        subjectType: "drag-n-drop",
        filePath: 'APT-Protocols-Report.pdf',
        fileName: "Protocols-Report"
    })

    cy.get('#file-submit').click()
    cy.get("#uploaded-files").should('be.visible').and('include.text', "Protocols-Report")
})


it('upload 3 - selectFile()', () => {

    cy.visit("https://the-internet.herokuapp.com/upload")

    // cy.get("#file-upload").selectFile("cypress/fixtures/APT-Protocols-Report.pdf")

    // or use selectFile, in this case full file path is required, contents if you want to rename file call
    cy.get("#file-upload").selectFile({
        contents: 'cypress/fixtures/APT-Protocols-Report.pdf',
        fileName: "Protocols-Report"
    })

    cy.get('#file-submit').click()
    cy.get("#uploaded-files").should('be.visible').and('include.text', "Protocols-Report")
})

it('upload 4 - selectFile(drag)', () => {

    cy.visit("https://the-internet.herokuapp.com/upload")

    cy.get("#file-upload").selectFile({
        contents: 'cypress/fixtures/APT-Protocols-Report.pdf',
        fileName: "Protocols-Report"
    },
        {
            action: "drag-drop"
        })

    cy.get('#file-submit').click()
    cy.get("#uploaded-files").should('be.visible').and('include.text', "Protocols-Report")
})


it('upload 5 - attachFile() multiple', () => {

    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php")

    const files = ["APT-Protocols-Report.pdf", "citizenship discover-large.pdf"]

    cy.get("[name='filesToUpload']").attachFile(files)

    cy.get("#fileList li").should('be.visible').each((liText, index) => {

        cy.wrap(liText).should("include.text", files[index])
    })
})


it('upload 6 - selectFile() multiple', () => {

    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php")

    const files = ["APT-Protocols-Report.pdf", "citizenship discover-large.pdf"]
    let filesConcat = files.map(file => `cypress/fixtures/${file}`);

    cy.get("[name='filesToUpload']").selectFile(filesConcat)

    cy.get("#fileList li").should('be.visible').each((liText, index) => {

        cy.wrap(liText).should("include.text", files[index])
    })
})


it.only('upload 7 - shadow dom', () => {

    cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm")

    //first approach -> { includeShadowDom: true }
    cy.get("input[smart-id='browseInput']", { includeShadowDom: true }).attachFile("APT-Protocols-Report.pdf")
    cy.get("span.smart-item-name", { includeShadowDom: true }).should("be.visible").and("have.text", "APT-Protocols-Report.pdf")
    cy.get("[smart-id='uploadAllButton']", { includeShadowDom: true }).should("be.visible")

    //second approach -> shadow()
    cy.get("smart-ui-file-upload")
        .shadow()
        .find("smart-button[smart-id='cancelAllButton'] button")
        .should("be.visible")
        .click().should("not.be.visible")
})