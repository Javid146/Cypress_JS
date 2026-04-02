import 'cypress-file-upload'

describe("File Upload", () => {
    //install pack 1st: npm install --save-dev cypress-file-upload

    it("upload single file", () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get("#file-upload").attachFile("citizenship discover-large.pdf") //files are added to fixtures folder
        cy.get("#file-submit").click()
        cy.wait(1000)
        cy.xpath("//h3[normalize-space()='File Uploaded!']").should("be.visible")
    })


    it("file upload - rename", () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get("#file-upload").attachFile({ filePath: 'citizenship discover-large.pdf', fileName: 'cucu.pdf' }) //files are added to fixtures folder
        cy.get("#file-submit").click()
        cy.wait(1000)
        cy.get("#uploaded-files").should("contain.text", "cucu.pdf")
    })


    it("file upload - drag and drop", () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get("#drag-drop-upload").attachFile("APT-Protocols-Report.pdf", { subjectType: 'drag-n-drop' })
        cy.wait(1000)
        cy.xpath("//span[normalize-space()='APT-Protocols-Report.pdf']").should("be.visible")
    })


    it("upload multiple files", () => {
        cy.visit("http://davidwalsh.name/demo/multiple-file-upload.php")
        cy.get("#filesToUpload").attachFile(["APT-Protocols-Report.pdf", "citizenship discover-large.pdf"])
        cy.get("#fileList li").should("have.length", 2)
    })


    it.only('multiple with regular each() assertion', () => {

        cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php")

        const files = ["APT-Protocols-Report.pdf", "citizenship discover-large.pdf"]
        cy.get("#filesToUpload").attachFile(files)
        // or we use selectFile() to upload. It requires file path that's why we use map to transform file name to cypress/fixtures/<fileName>
        //  cy.get("#filesToUpload").selectFile(files.map(f => `cypress/fixtures/${f}`))
        cy.get("#fileList").should("be.visible")

        cy.get("#fileList li").each((textVal, index) => {
            expect(textVal.text()).to.include(files[index])
        })
    })


    it('multiple using deep.equal assertion', () => {

        cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php")

        const files = ["APT-Protocols-Report.pdf", "citizenship discover-large.pdf"]

        cy.get("#filesToUpload")
            .selectFile(files.map(f => `cypress/fixtures/${f}`))

        cy.get("#fileList li")
            .then($lis => {
                const uploadedFiles = [...$lis].map(li => li.innerText)
                expect(uploadedFiles).to.deep.equal(files)
            })
    })


    it.only("file upload -shadow dom", () => {
        cy.visit("http://htmlelements.com/demos/fileupload/shadow-dom/index.htm")

        //approach 1: get element in shadow dom and interact using { includeShadowDom: true }
        cy.get("input[smart-id='browseInput']", { includeShadowDom: true })
            .attachFile("APT-Protocols-Report.pdf")
            
        cy.get("smart-file-upload:nth-child(1) > div:nth-child(1) > div:nth-child(4) > smart-button:nth-child(1) > button:nth-child(1)", { includeShadowDom: true }).click()
        cy.get("div[smart-id='selectedFiles']", { includeShadowDom: true }).should("be.visible")

        //approach 2: find shadow dom host (last tag that includes shadow) -> add shadow() -> find required element in that shadow
        cy.get(".smart-ui-component").shadow().find("div[smart-id='selectedFiles'] span:nth-of-type(1)").should("contain.text", "APT-Protocols-Report.pdf")
    })
})