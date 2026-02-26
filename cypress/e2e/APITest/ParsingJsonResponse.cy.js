let productsResponse

before(() => {
    cy.request({
        method: "GET",
        url: "https://fakestoreapi.com/products",
        qs: { limit: 3 } //returns only 3 objects out of whole response. qs -> queryParam
    }).then((resp) => {
        expect(resp.status).to.eq(200)
        productsResponse = resp  // store globally
    })
})


it('parse json response', () => {

    const response = productsResponse
    expect(response.body[2].id).eq(3)
})


it('parse json response 2', () => {

    let totalPricePer3 = 0;
    const response = productsResponse

    response.body.forEach((eachObject) => {
        totalPricePer3 = totalPricePer3 + eachObject.price
    })

    expect(totalPricePer3).to.be.above(187)
})

