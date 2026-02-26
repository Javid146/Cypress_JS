it('download', () => {

    //1. install plugin first: npm install cypress-downloadfile
    //2. in config.js add: 
    //  const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
    //  on('task', {downloadFile})

    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg', 'mydownloads', 'example.jpg')
})