let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();

let server = require("../server");

chai.use(chaiHttp);

describe("Testing STATIC-PAGES router", () => {

    describe("/GET route", () => {
            it("it should GET page about-us", (done) => {
                chai.request(server)
                    .get("/about-us")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET page our-policy", (done) => {
                chai.request(server)
                    .get("/our-policy")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET page careers", (done) => {
                chai.request(server)
                    .get("/careers")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });
        }
    );


})