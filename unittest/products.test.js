let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let should = chai.should();

let server = require('../server');
// let Product = require('../models/Product');

chai.use(chaiHttp);

describe('Testing PRODUCTS router', () => {

    describe('/GET route /products', () => {
            it("it should GET all the products", (done) => {
                chai.request(server)
                    .get('/products')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products", (done) => {
                chai.request(server)
                    .get('/products')
                    .end(function (err, res) {
                        res.body.should.be.a('array');
                        done(err);
                    })
            });
        }
    );

    describe('/GET route /products/women', () => {
            it("it should GET all the products of category", (done) => {
                chai.request(server)
                    .get('/products/women')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products of category", (done) => {
                chai.request(server)
                    .get('/products/women')
                    .end(function (err, res) {
                        res.body.should.be.a('array');
                        done(err);
                    })
            });
        }
    );

    describe('/GET route /products/women/clothing', () => {
            it("it should GET all the products of category", (done) => {
                chai.request(server)
                    .get('/products/women/clothing')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products of category", (done) => {
                chai.request(server)
                    .get('/products/women/clothing')
                    .end(function (err, res) {
                        res.body.should.be.a('array');
                        done(err);
                    })
            });
        }
    );

    describe('/GET route /products/women/clothing/tops', () => {
            it("it should GET all the products of tops", (done) => {
                chai.request(server)
                    .get('/products/women/clothing/tops')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products of tops", (done) => {
                chai.request(server)
                    .get('/products/women/clothing/tops')
                    .end(function (err, res) {
                        res.body.should.be.a('array');
                        done(err);
                    })
            });
        }
    );

    // describe('/GET route /products/women/clothing/tops/96239', () => {
    //         it("it should GET all the products of tops", (done) => {
    //             let product = new Product({
    //                 category: "women",
    //                 subCategory: "clothing",
    //                 furtherSubCategory: "tops",
    //                 model: "Gentle snow-white top",
    //                 currentPrice: 85,
    //             });
    //             product.save((err, product) =>{
    //                 chai.request(server)
    //                     .get('/products/women/clothing/tops/96239')
    //                     .send(product)
    //                     .end(function (err, res) {
    //                         res.should.have.status(200);
    //                         res.body.should.be.a('array');
    //                         res.body.should.have.property('category');
    //                         res.body.should.have.property('subCategory');
    //                         res.body.should.have.property('furtherSubCategory');
    //                         res.body.should.have.property('model');
    //                         res.body.should.have.property('currentPrice');
    //                         done(err);
    //                     })
    //             })
    //
    //         });
    //
    //     }
    // );

    // describe('/POST route /products/add-products', () => {
    //         it("it should POST new product", (done) => {
    //             let product = {
    //                 category: "women",
    //                 subCategory: "clothing",
    //                 furtherSubCategory: "dresses",
    //                 model: "New Test dresses",
    //                 currentPrice: 500,
    //                 productUrl: "/women/clothing/dresses/",
    //                 productFeatures: [{
    //                     "color": "#000000",
    //                     "colorName": "black",
    //                     "imageUrls": [
    //                         "/img/products/women/clothing/dresses/008/000000/080.jpg",
    //                         "/img/products/women/clothing/dresses/008/000000/081.jpg"
    //                     ],
    //                     "sizes": [
    //                         {
    //                             "size": "s",
    //                             "quantity": 3
    //                         },
    //                         {
    //                             "size": "xs",
    //                             "quantity": 5
    //                         },
    //                         {
    //                             "size": "m",
    //                             "quantity": 10
    //                         },
    //                         {
    //                             "size": "l",
    //                             "quantity": 1
    //                         }
    //                     ]
    //                 }]
    //             };
    //             chai.request(server)
    //                 .post('/products/add-products')
    //                 .send(product)
    //                 .end((err, res) =>{
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     done(err);
    //                 })
    //         });
    //     }
    // );


})