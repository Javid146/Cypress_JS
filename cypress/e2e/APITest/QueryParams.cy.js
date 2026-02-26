it('query param', () => {

    cy.request({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/comments",
        qs: { postId: 1 }    //qs -> queryParams
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.status).equal(200)
            expect(response.body).to.have.length.above(4)
            expect(Object.keys(response.body[0])).to.have.length.above(4)
            expect(response.body[0]).to.have.property("id", 1)
            expect(response.body[0]).to.have.property("email", "Eliseo@gardner.biz")
        })
})