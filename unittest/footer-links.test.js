let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();

let server = require("../server");

chai.use(chaiHttp);

describe("Testing FOOTER-LINKS router", () => {

    describe("/GET route", () => {
            it("it should GET all the footer-links", (done) => {
                chai.request(server)
                    .get("/get-footer")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the footer-links", (done) => {
                chai.request(server)
                    .get("/get-footer")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        res.body.length.should.be.eql(5);
                        done(err);
                    })
            });
        }
    );

})