//    "test": "mocha './routes/categoryCarousels.test.js' --timeout 10000",
// "test": "mocha \"./{,!(node_modules)/**/}*.test.js\""

const mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const expect = chai.expect;

let cattest = require('../routes/categoryCarousels.js');

chai.use(chaiHttp);
// chai.use(require('chai-as-promised'));

describe('/GET ', () => {
    it('it should GET all the books', async (done) => {
         await chai.request(cattest)
            .get('/categoryCarousels')
            .end((err, res) => {
                // expect(res).to.have.status(200);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    })
    }
);