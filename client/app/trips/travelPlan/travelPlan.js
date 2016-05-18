'use strict';

angular.module('trippalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('travel-plan', {
        url: '/travel-plan',
        template: '<travel-plan></travel-plan>'
      });
  });
