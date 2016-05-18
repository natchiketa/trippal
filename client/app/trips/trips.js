'use strict';

angular.module('trippalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trips', {
        url: '/trips',
        template: '<trips></trips>'
      })
  });
