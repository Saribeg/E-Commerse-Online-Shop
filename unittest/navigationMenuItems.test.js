let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
let should = chai.should();

let server = require("../server");

chai.use(chaiHttp);

describe("Testing NAVIGATION-MENU-ITEMS router", () => {
    describe("/GET route", () => {
            it("it should GET all the nav-menu", (done) => {
                chai.request(server)
                    .get("/nav-menu")
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done(err);
                    })
            });

            it("it should GET array all the nav-menu", (done) => {
                chai.request(server)
                    .get("/nav-menu")
                    .end(function (err, res) {
                        res.body.should.be.a("array");
                        done(err);
                    })
            });
        }
    );

    // describe('/POST route', () => {
    //         it("it should GET all the nav-menu", (done) => {
    //             let newNavMenuItem = {
    //
    //             }
    //             chai.request(server)
    //                 .post('/navigation-menu/add-list')
    //                 .send(newNavMenuItem)
    //                 .end(function (err, res) {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('array');
    //                     done(err);
    //                 })
    //         });
    //     }
    // );


})