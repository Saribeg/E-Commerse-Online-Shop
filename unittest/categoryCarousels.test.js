const request = require('supertest');
const express = require('express');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const expect = chai.expect;

let cattest = require('../routes/categoryCarousels');

chai.use(chaiHttp);

describe('/GET ', () => {
        // it('it should GET all the books', async (done) => {
        //     await chai.request(cattest)
        //         .get('/categoryCarousels')
        //         .end((err, res) => {
        //             // expect(res).to.have.status(200);
        //             res.should.have.status(200);
        //             res.body.should.be.a('array');
        //             done();
        //         })
        // })

        it("/GET", async (done) => {
            await request(cattest)
                .get("/categoryCarousels")
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    }
);