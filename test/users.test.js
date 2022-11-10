const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const knex = require('../database');

chai.use(chaiHttp);
chai.should();

describe('/sign-up users', () => {
  it('it should create users', (done) => {
    let users = {
      id: '1',
      email: 'test@example.com',
      first_name: 'test',
      last_name: 'user',
      password: 'user123',
      balance: '0',
    };

    chai
      .request(app)
      .post('/api/v1/users/sign-up')
      .set('content-type', 'application/json')
      .send(users)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/logout users', () => {
  it('It should logout users and revoke jwt authentication', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/logout')
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/PATCH/:id users', () => {
  it('It should UPDATE users by id', (done) => {
    const id = 1;
    let users = {
      id: id,
      first_name: 'user',
      last_name: 'test',
      email: 'test@gmail.com',
      password: 'test1234',
    };

    chai
      .request(app)
      .patch('/api/v1/users/' + id)
      .set('content-type', 'application/json')
      .send(users)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/GET users', () => {
  it('It should GET all the users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/')
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('It should GET users by id', (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/users/${id}`)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/DELETE/:id users', () => {
  it('It should DELETE users by id', (done) => {
    const id = 1;
    chai
      .request(app)
      .delete('/api/v1/users/' + id)
      .set('content-type', 'application/json')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/deposit/:id users', () => {
  it('It should add or increase user balance by amount in body', (done) => {
    const id = 1;
    let amount = '500';
    chai
      .request(app)
      .post('/api/v1/users/deposit' + id)
      .set('content-type', 'application/json')
      .send(amount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/withdraw/:id users', () => {
  it('It should subtract or decrease user balance by amount in body', (done) => {
    const id = 1;
    let amount = '1000';
    chai
      .request(app)
      .post('/api/v1/users/withdraw' + id)
      .set('content-type', 'application/json')
      .send(amount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/transfer users', () => {
  it('It should send funds from one to another via users unique email', (done) => {
    const id = 1;
    let user = {
      from: 'test@example.com',
      to: 'test2@example.com',
      amount: '1000',
    };
    chai
      .request(app)
      .post('/api/v1/users/transfer')
      .set('content-type', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
