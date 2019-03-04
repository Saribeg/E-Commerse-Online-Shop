//    "test": "mocha './routes/categoryCarousels.test.js' --timeout 10000",
// "test": "mocha \"./{,!(node_modules)/**/}*.test.js\""

const mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

let cattest = require('../routes/categoryCarousels.js');

chai.use(chaiHttp);

describe('/GET ', () => {
    it('it should GET all the books', async (done) => {
        await chai.request(cattest)
            .get('/categoryCarousels')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
    }
);