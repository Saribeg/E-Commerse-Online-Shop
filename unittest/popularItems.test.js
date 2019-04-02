let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();

let server = require("../server");

chai.use(chaiHttp);

describe("Testing POPULAR-ITEMS router", () => {

    describe("/GET route /popular-items", () => {
            it("it should GET all the popular products", (done) => {
                chai.request(server)
                    .get("/popular-items")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the products", (done) => {
                chai.request(server)
                    .get("/popular-items")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        done(err);
                    })
            });
        }
    );

})