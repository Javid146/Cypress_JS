const xmlPayload = `<Pet>         <id>1</id>      <category>         <id>10</id>         <name>Dog</name>     </category>      <name>doggie</name>      <photoUrls>         <photoUrl>string</photoUrl>     </photoUrls>      <tags>         <Tag>             <id>100</id>             <name>friendly</name>         </Tag>         <Tag>             <id>101</id>             <name>string</name>         </Tag>     </tags>      <status>available</status> </Pet>`
let petId = null;

it('creating pet', () => {
    cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/pet",
        body: xmlPayload,
        headers:
        {
            'Content-Type': "application/xml",  //for sending request
            'Accept': 'application/xml'         //for getting respone
        }
    })
        .then((response) => {
            expect(response.status).eq(200)

            cy.task('parseXml', response.body)
                .then((result) => {

                    petId = result.Pet.id
                    console.log(result)
                })
        })
})

/*
     cy.task() is a Cypress command used to execute code in the Node.js environment
     (outside of the browser). Since xml2js is a Node-only library, it cannot run
     directly inside Cypress test files (which run in the browser).
     
     cy.task() -> is good for File system, DB, parsing, scripts

     'parseXml' is a custom task that we defined inside cypress.config.js
     using setupNodeEvents(). It uses xml2js to convert XML into a JavaScript object.

     In cypress.config.js we added something like:

     on('task', {
         parseXml(xml) {
             const parser = new xml2js.Parser({ explicitArray: false })
             return parser.parseStringPromise(xml)
         }
     })

     That is where 'parseXml' comes from.
*/

it('fetch pet data from xml', () => {
    cy.request({
        method: "GET",
        url: `https://petstore.swagger.io/v2/pet/${petId}`,
        headers:
        {
            'Accept': 'application/xml'         //for getting respone
        }
    })
        .then((response) => {
            expect(response.status).eq(200)

            cy.task('parseXml', response.body)
                .then((result) => {
                    expect(result.Pet.id = petId)
                    expect(result.Pet.name).to.eq("doggie")
                    expect(result.Pet.status).to.eq("available")
                })
        })
})
