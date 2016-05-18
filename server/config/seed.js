/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Trip = sqldb.Trip;
var User = sqldb.User;

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      role: 'manager',
      name: 'Test Manager',
      email: 'manager@example.com',
      password: 'manager'
    }, {
      provider: 'local',
      role: 'user',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
      console.log('adding trips for users');

      Trip.sync()
        .then(() => {
          return Trip.destroy({ where: {} });
        })
        .then(() => {
          User.findOne({where: {name: 'Test User'} }).then(user => {
            var trip = Trip.create({
              destination: 'Barcelona',
              UserId: user._id
            });

            return trip;
          })
        });
    });
  });
