const mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
const express = require("express");
let server = require('../server');
let should = chai.should();

let cattest = require('./categoryCarousels.js');

chai.use(chaiHttp);

describe('/GET ', () => {
    it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/categoryCarousels')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
    }
)