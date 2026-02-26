it('basic auth', () => {

    cy.request({
        method: "GET",
        url: "https://postman-eco.com/basic-auth",
        auth: {
            user: "postman",
            password: "password"
        }
    })
        .then((response) => {
            expect(response.status).eq(200)
        })
})


it('digest auth', () => { //similar to basic auth, but more secure, password is always sent as hash, so not disclosed

    cy.request({
        method: "GET",
        url: "https://postman-eco.com/basic-auth",
        auth: {
            user: "postman",
            password: "password",
            method: "digest"
        }
    })
        .then((response) => {
            expect(response.status).eq(200)
        })
})


// it('bearer token auth', () => {

//     cy.request({
//         method: "GET",
//         url: "https://api.github.com/user/repos",
//         headers: {
//             Authorization: "Bearer " + Cypress.env('github_token') //get bearer token from github settings if needed
//         }
//     })
//         .then((response) => {
//             expect(response.status).eq(200)
//         })
// })


it('api key auth', () => { //static and less secure auth

    cy.request({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast",
        qs: {
            q: "Baku",
            appid: "624097c3e04fa67f0cadccd07e5f29ef"     //get new appid from openweathermap.org if needed. 
        }
    })
        .then((response) => {
            expect(response.status).eq(200)
        })
})