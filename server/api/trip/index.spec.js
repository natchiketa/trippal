'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tripCtrlStub = {
  index: 'tripCtrl.index',
  show: 'tripCtrl.show',
  create: 'tripCtrl.create',
  update: 'tripCtrl.update',
  destroy: 'tripCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tripIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './trip.controller': tripCtrlStub
});

describe('Trip API Router:', function() {

  it('should return an express router instance', function() {
    tripIndex.should.equal(routerStub);
  });

  describe('GET /api/trips', function() {

    it('should route to trip.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tripCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/trips/:id', function() {

    it('should route to trip.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tripCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/trips', function() {

    it('should route to trip.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tripCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/trips/:id', function() {

    it('should route to trip.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tripCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/trips/:id', function() {

    it('should route to trip.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tripCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/trips/:id', function() {

    it('should route to trip.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tripCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
