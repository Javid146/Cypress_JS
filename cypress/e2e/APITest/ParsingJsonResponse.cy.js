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

    response.body.forEach((eachObject) => { //if body is array like in below example we can loop it with forEach
        totalPricePer3 = totalPricePer3 + eachObject.price
    })

    expect(totalPricePer3).to.be.above(187)
})

/*
example for body:
{
  "body": [
    { "id": 1, "name": "Phone", "price": 100 },
    { "id": 2, "name": "Laptop", "price": 200 },
    { "id": 3, "name": "Tablet", "price": 150 }
  ]
}
*/
