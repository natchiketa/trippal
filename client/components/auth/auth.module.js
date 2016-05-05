'use strict';

angular.module('trippalApp.auth', [
  'trippalApp.constants',
  'trippalApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
