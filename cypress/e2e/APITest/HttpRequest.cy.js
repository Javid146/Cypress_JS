describe('HTTP Requests', () => {

    it("GET", () => {
        cy.request('GET', "https://jsonplaceholder.typicode.com/posts/1").its('status').should('eq', 200)
    })


    it("POST", () => {

        cy.request(
            {
                method: 'POST',
                url: "https://jsonplaceholder.typicode.com/posts",
                body: {
                    title: "Test post",
                    body: "post call",
                    userId: 5
                }
            })
            .its('status').should('eq', 201)
    })


    it("PUT", () => {
        cy.request(
            {
                method: 'PUT',
                url: "https://jsonplaceholder.typicode.com/posts/1",
                body: {
                    title: "Test post - update",
                    body: "put call",
                    userId: 5,
                    id: 5
                }
            })
            .its('status').should('eq', 200)
    })


    it("DELETE", () => {
        cy.request('GET', "https://jsonplaceholder.typicode.com/posts/5").its('status').should('eq', 200)
    })

})
