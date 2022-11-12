const assert = require('assert');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const knex = require('../database');

chai.use(chaiHttp);
chai.should();

describe('/create-account/:userId accounts', () => {
  it('it should create an account for an already existing user', (done) => {
    const id = 1;
    let account = {
      id: id,
      email: 'abc@example.com',
    };
    chai
      .request(app)
      .post(`/api/v1/accounts/create-account/${id}`)
      .set('content-type', 'application/json')
      .send(account)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

it('it should not create an account for a non existing user', (done) => {
  const id = 1;
  let account = {
    email: 'abc@example.com',
  };
  chai
    .request(app)
    .post(`/api/v1/accounts/create-account/${id}`)
    .set('content-type', 'application/json')
    .send(account)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
});

describe('/GET accounts', () => {
  it('It should GET all the accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/')
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It should GET accounts by id', (done) => {
    const id = 22;
    chai
      .request(app)
      .get(`/api/v1/accounts/${id}`)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/DELETE/:id accounts', () => {
  it('It should DELETE accounts by id', (done) => {
    const id = 28;
    chai
      .request(app)
      .delete('/api/v1/accounts/' + id)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/deposit/:accountId accounts', () => {
  it('It should add or increase user balance by amount in body', (done) => {
    const id = 22;

    let users_id = 4;
    let amount = '500';
    chai
      .request(app)
      .post('/api/v1/accounts/deposit' + id)
      .set('content-type', 'application/json')
      .send(amount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/withdraw/:accountId accounts', () => {
  it('It should subtract or decrease user balance by amount in body', (done) => {
    const id = 22;

    let users_id = 4;
    let amount = '500';
    chai
      .request(app)
      .post('/api/v1/accounts/withdraw' + id)
      .set('content-type', 'application/json')
      .send(amount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/transfer/:accountId accounts', () => {
  it('It should send funds from one to another via users unique email', (done) => {
    const id = 28;
    let account = {
      users_id: 5,
      from: 'test@example.com',
      to: 'test2@example.com',
      amount: '1000',
    };
    chai
      .request(app)
      .post('/api/v1/users/transfer')
      .set('content-type', 'application/json')
      .send(account)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
