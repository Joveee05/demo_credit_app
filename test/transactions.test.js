const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const knex = require('../database');

chai.use(chaiHttp);
chai.should();

describe('/GET transactions', () => {
  it('It should GET all the transactions', (done) => {
    chai
      .request(app)
      .get('/api/v1/transactions/')
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It should GET transactions by id', (done) => {
    const id = 10;
    chai
      .request(app)
      .get(`/api/v1/transactions/${id}`)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/DELETE/:id transactions', () => {
  it('It should DELETE transactions by id', (done) => {
    const id = 5;
    chai
      .request(app)
      .delete('/api/v1/transactions/' + id)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/GET/:userId transactions', () => {
  it('it should get all transactions for a particular user', (done) => {
    const id = 4;
    chai
      .request(app)
      .get('/api/v1/transactions/' + id)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
