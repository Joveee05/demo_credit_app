const assert = require('assert');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const knex = require('../database');

chai.use(chaiHttp);
chai.should();

describe('/sign-up users', () => {
  it('it should not create users without email', (done) => {
    let users = {
      first_name: 'test',
      last_name: 'user',
      password: 'user123',
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

  it('it should create users', (done) => {
    let users = {
      id: 1,
      email: 'test@example.com',
      firstName: 'test',
      lastNme: 'user',
      password: 'user123',
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
