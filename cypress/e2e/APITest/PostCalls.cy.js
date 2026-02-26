it("POST", () => {

    const reqBody = {
        title: Math.random().toString().substring(2), //Math.random() returns floating numbetween 0-1 like 0.31242. So substring(2) removes 0. and returns 31242
        body: "post call",
        userId: Math.random()
    }

    cy.request(
        {
            method: 'POST',
            url: "https://jsonplaceholder.typicode.com/posts",
            body: reqBody
        })
        .then((respone) => {
            expect(respone.status).to.equal(201)
            expect(respone.body.title).to.eq(reqBody.title)
            expect(respone.body.userId).to.eq(reqBody.userId)
        })
})


let fixtureData

before(() => {
    cy.fixture("postCallData").then((data) => {
        fixtureData = data
    })
})

it("POST - read data from fixture", () => {

    cy.request({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        body: fixtureData
    }).then((response) => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.eq(fixtureData.title)
    })
})