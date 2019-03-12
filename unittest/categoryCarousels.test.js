let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
let should = chai.should();

let server = require('../server');
let CategoryCarousels = require('../models/CategoryCarousel');

chai.use(chaiHttp);

describe('Testing categoryCarousels router', () => {

    describe('/GET route', () => {
            it("it should GET all the categoryCarousels", (done) => {
                chai.request(server)
                    .get('/categoryCarousels')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the categoryCarousels", (done) => {
                chai.request(server)
                    .get('/categoryCarousels')
                    .end(function (err, res) {
                        res.body.should.be.a('array');
                        done(err);
                    })
            });
        }
    );

    describe('/POST route', () => {
            it("it should POST new category", (done) => {
                let category = {
                    categoryName: "Sport",
                    categoryUrl: "/men/clothing/sport",
                    categoryImg: "/img/categories/men/clothing/sport.jpg"
                }
                chai.request(server)
                    .post('/categoryCarousels/add-categoryItem')
                    .send(category)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done(err);
                    })
            });
        }
    );

})