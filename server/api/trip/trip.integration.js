'use strict';

var app = require('../..');
import request from 'supertest';

var newTrip;

describe('Trip API:', function() {

  describe('GET /api/trips', function() {
    var trips;

    beforeEach(function(done) {
      request(app)
        .get('/api/trips')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          trips = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      trips.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/trips', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trips')
        .send({
          name: 'New Trip',
          info: 'This is the brand new trip!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTrip = res.body;
          done();
        });
    });

    it('should respond with the newly created trip', function() {
      newTrip.name.should.equal('New Trip');
      newTrip.info.should.equal('This is the brand new trip!!!');
    });

  });

  describe('GET /api/trips/:id', function() {
    var trip;

    beforeEach(function(done) {
      request(app)
        .get('/api/trips/' + newTrip._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          trip = res.body;
          done();
        });
    });

    afterEach(function() {
      trip = {};
    });

    it('should respond with the requested trip', function() {
      trip.name.should.equal('New Trip');
      trip.info.should.equal('This is the brand new trip!!!');
    });

  });

  describe('PUT /api/trips/:id', function() {
    var updatedTrip;

    beforeEach(function(done) {
      request(app)
        .put('/api/trips/' + newTrip._id)
        .send({
          name: 'Updated Trip',
          info: 'This is the updated trip!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTrip = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrip = {};
    });

    it('should respond with the updated trip', function() {
      updatedTrip.name.should.equal('Updated Trip');
      updatedTrip.info.should.equal('This is the updated trip!!!');
    });

  });

  describe('DELETE /api/trips/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/trips/' + newTrip._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trip does not exist', function(done) {
      request(app)
        .delete('/api/trips/' + newTrip._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
