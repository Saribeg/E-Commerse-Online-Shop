let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();

let server = require("../server");
let Product = require("../models/Product");

chai.use(chaiHttp);

describe("Testing PRODUCTS router", () => {

    describe("/GET route /products", () => {
            it("it should GET all the products", (done) => {
                chai.request(server)
                    .get("/products")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products", (done) => {
                chai.request(server)
                    .get("/products")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        done(err);
                    })
            });
        }
    );

    describe("/GET route /products/women", () => {
            it("it should GET all the products of category", (done) => {
                chai.request(server)
                    .get("/products/women")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products of category", (done) => {
                chai.request(server)
                    .get("/products/women")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        done(err);
                    })
            });
        }
    );

    describe("/GET route /products/women/clothing", () => {
            it("it should GET all the products of category", (done) => {
                chai.request(server)
                    .get("/products/women/clothing")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products of category", (done) => {
                chai.request(server)
                    .get("/products/women/clothing")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        done(err);
                    })
            });
        }
    );

    describe("/GET route /products/women/clothing/tops", () => {
            it("it should GET all the products of tops", (done) => {
                chai.request(server)
                    .get("/products/women/clothing/tops")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products of tops", (done) => {
                chai.request(server)
                    .get("/products/women/clothing/tops")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
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
    //                     .get("/products/women/clothing/tops/96239")
    //                     .send(product)
    //                     .end(function (err, res) {
    //                         res.should.have.status(200);
    //                         res.body.should.be.a("array");
    //                         res.body.should.have.property('category');
    //                         res.body.should.have.property('subCategory');
    //                         res.body.should.have.property('furtherSubCategory');
    //                         res.body.should.have.property('model');
    //                         res.body.should.have.property('currentPrice');
    //                         res.body.should.have.property('_id').eql(96239);
    //                         done(err);
    //                     })
    //             })
    //
    //         });
    //
    //     }
    // );



})