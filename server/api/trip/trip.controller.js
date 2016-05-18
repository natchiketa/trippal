/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/trips              ->  index
 * POST    /api/trips              ->  create
 * GET     /api/trips/:id          ->  show
 * PUT     /api/trips/:id          ->  update
 * DELETE  /api/trips/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Trip} from '../../sqldb';
import {User} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Trips
export function index(req, res) {
  var user = req.user;
  if(user.role === 'admin') {
    return Trip.findAll()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
  else if(user.role === 'user') {
    return Trip.findAll({
      where: { UserId: user._id }
    })
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Gets a single Trip from the DB
export function show(req, res) {
  return Trip.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Trip in the DB
export function create(req, res) {
  var trip = req.body;
  trip.UserId = req.user._id;

  return Trip.create(trip)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Trip in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Trip.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Trip from the DB
export function destroy(req, res) {
  return Trip.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
