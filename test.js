import 'babel-polyfill';
import mongoose from 'mongoose';
import assert from 'assert';
import request from 'supertest';
import app from './server/app';

describe('Server API Test', () => {
  it('Sign In Request: should return JSON Web Token', (done) => {
    request(app)
      .post('/api/user/signin')
      .expect(200)
      .send({
        email: 'kyeongmo2@gmail.cm',
        password: '12345',
      })
      .end((error, response) => {
        if(error) throw error;
        let processedToken = response.body.token.split('.')[1];
        processedToken = JSON.parse(new
          Buffer(processedToken, 'base64').toString());
        assert.equal('kyeongmo2@gmail.com', processedToken.email);
        assert.equal('Kyeongmo Noh', processedToken.name);
        done();
      });
  });

  it('List Post Request: should return a object of posts', (done) => {
    request(app)
      .get('/api/post/all')
      .expect(200)
      .end((error, response) => {
        if(error) throw error;
        assert.equal('object', typeof response.body.posts);
        done();
      });
  });
});
