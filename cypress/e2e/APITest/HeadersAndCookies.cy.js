let accessT = null;

before('create access token', () => {

    cy.request({
        method: "POST",
        url: "https://simple-books-api.click/api-clients",
        headers:
        {
            'Content-Type': "application/json",
        },
        body:
        {
            clientName: "Test",
            clientEmail: Math.random().toString(4).substring(2) + "csstedfgdstsdassda@gmail.com"
        }
    })
        .then((response) => {
            expect(response.status).to.equal(201)
            accessT = response.body.accessToken
        })
})


before("create order", () => {

    cy.request({
        method: "POST",
        url: "https://simple-books-api.click/orders",
        headers:
        {
            'Content-Type': "application/json",
            Authorization: `Bearer ${accessT}`
        },
        body:
        {
            bookId: "5",
            customerName: "Javid"
        }
    })
        .then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.created).to.equal(true)
        })
})


it('fetch orders', () => {

    cy.request({
        method: "GET",
        url: "https://simple-books-api.click/orders",
        headers:
        {
            'Content-Type': "application/json",
            Authorization: `Bearer ${accessT}`
        },
        cookies: "myCookie"
    })
        .then((response) => {
            expect(response.status).to.equal(200)
        })
})