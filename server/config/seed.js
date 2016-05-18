/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import moment from 'moment';

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
            var trips = Trip.bulkCreate([
              {
                destination: 'Barcelona',
                start_date: moment().toDate(),
                end_date: moment().add(8, 'days').toDate(),
                UserId: user._id
              },
              {
                destination: 'Madrid',
                start_date: moment().add(10, 'days').toDate(),
                end_date: moment().add(12, 'days').toDate(),
                UserId: user._id
              },
              {
                destination: 'Toledo',
                start_date: moment().add(13, 'days').toDate(),
                end_date: moment().add(15, 'days').toDate(),
                UserId: user._id
              },
              {
                destination: 'Segovia',
                start_date: moment().add(16, 'days').toDate(),
                end_date: moment().add(17, 'days').toDate(),
                UserId: user._id
              },
              {
                destination: 'Lisbon',
                start_date: moment().add(18, 'days').toDate(),
                end_date: moment().add(25, 'days').toDate(),
                UserId: user._id
              },
            ]);

            return trips;
          })
        });
    });
  });
