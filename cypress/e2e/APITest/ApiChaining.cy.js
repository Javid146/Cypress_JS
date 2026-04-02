const accessToken = "Bearer d88a9820015da1a01cb5eaa8f2c5351d3363a1cbd9cc36eeee97796d8ee389c9"
const baseUrl = Cypress.env('gorestBaseUrl')
let randonWord = Math.random().toString(5).substring(2);

it('api chaining: post, put, delete with gorest api', () => {

    cy.request({
        method: "POST",
        url: baseUrl + "public/v2/users",
        body: {
            "name": "cucu_" + randonWord,
            "gender": "male",
            "email": randonWord + "@gmail.com",
            "status": "inactive"
        },
        headers: {
            Authorization: accessToken
        }
    })
        .then((response) => {
            expect(response.status).eq(201)
            
            const createdUserId = response.body.id
            console.log("createdUserId: " + createdUserId)

            cy.request({
                method: "PUT",
                url: baseUrl + `public/v2/users/${createdUserId}`,
                body: {
                    "name": "Javid",
                    "gender": "male",
                    "email": randonWord + "_jmammadli@gmail.com",
                    "status": "active"
                },
                headers: {
                    Authorization: accessToken
                }
            })
                .then((response) => {
                    expect(response.status).eq(200)
                    console.log("createdUserId logged in devtools: " + createdUserId)
                    cy.log("createdUserId logged in test steps: " + createdUserId)

                    cy.request({
                        method: "DELETE",
                        url: baseUrl + `public/v2/users/${createdUserId}`,
                        headers: {
                            Authorization: accessToken
                        }
                    })
                        .then((response) => {
                            expect(response.status).eq(204)
                        })
                })
        })
})
