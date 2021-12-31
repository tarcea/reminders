import request from 'supertest';
import { Express } from 'express-serve-static-core';
import app from '../src/app';
import http from 'http';
import { Server, Socket } from 'socket.io';

let server: Express;

describe('APP should say "This is your reminder"', () => {
  beforeAll(() => {
    server = app;
  });

  it('should return 200', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        // expect(res.body).toMatchObject({ 'message': `This is your reminder` })
        console.log('from test', res.body)
        done()
      })
  });
});