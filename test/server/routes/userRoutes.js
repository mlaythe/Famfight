const { expect } = require('chai');
const app = require('../../../server/server');
const request = require('supertest-as-promised');
const faker = require('faker');
const User = require('../../../server/users/userModel');

describe('POST /users/signup', () => {
  beforeEach((done) => {
    User.sync({ force: true }).then(() => done());
  });

  it('should signup user with proper request body', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      })
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.exist;
        done();
      });
  });

  it('should not allow signup when missing username', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        password: faker.internet.password(),
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });

  it('should not allow signup when missing password', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        username: faker.internet.userName(),
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });

  it('should not allow signup when username is shorter than 4 characters', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        username: 'hi',
        password: faker.internet.password(),
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });

  it('should not allow signup when password is shorter than 4 characters', (done) => {
    request(app)
      .post('/users/signup')
      .send({
        username: faker.internet.userName(),
        password: 'we2',
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });
});

describe('POST /users/login', () => {
  beforeEach((done) => {
    User.sync({ force: true }).then(() => {
      request(app)
        .post('/users/signup')
        .send({
          username: 'mlaythe',
          password: '1234',
        })
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          done();
        })
    });
  });

  it('should login user with proper request body', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: 'mlaythe',
        password: '1234',
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.exist;
        done();
      });
  });

  it('should not allow login when missing username', (done) => {
    request(app)
      .post('/users/login')
      .send({
        password: faker.internet.password(),
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });

  it('should not allow login when missing password', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: faker.internet.userName(),
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });

  it('should not allow login when username is shorter than 4 characters', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: 'we2',
        password: faker.internet.password(),
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });

  it('should not allow login when password is shorter than 4 characters', (done) => {
    request(app)
      .post('/users/login')
      .send({
        username: 'mlaythe',
        password: 'we2',
      })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id_token).to.not.exist;
        done();
      });
  });
});