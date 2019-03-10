let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;

// let cattest = require('../routes/categoryCarousels');

chai.use(chaiHttp);

describe('/GET ', () => {
        it("/GET", (done) => {
            chai.request('https://swapi.co/api')
                    .get('/')
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done(err);
                    })
        });
    }
);