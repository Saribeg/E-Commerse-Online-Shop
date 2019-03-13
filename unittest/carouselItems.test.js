let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();

let server = require("../server");

chai.use(chaiHttp);

describe("Testing CAROUSEL-ITEMS router", () => {

    describe("/GET route", () => {
            it("it should GET all products of carousel", (done) => {
                chai.request(server)
                    .get("/carousel")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all products of carousel", (done) => {
                chai.request(server)
                    .get("/carousel")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        res.body.length.should.be.eql(3);
                        done(err);
                    })
            });
        }
    );

    // describe('/POST route', () => {
    //         it("it should POST new carouselItem", (done) => {
    //             let newCarouselItem = {
    //                 product: {
    //                     model: "test models",
    //                     currentPrice: 201,
    //                     productUrl: "women/clothing/tops/1"
    //                 },
    //                 imageUrl: "/img/carousel/item1.jpg"
    //             }
    //             chai.request(server)
    //                 .post('/carousel/add-items')
    //                 .send(newCarouselItem)
    //                 .end(function (err, res) {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     done(err);
    //                 })
    //         });
    //     }
    // );

})