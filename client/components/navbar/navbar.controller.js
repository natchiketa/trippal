'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
      'title': 'Trips',
      'state': 'trips'
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.isManager = Auth.isManager;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('trippalApp')
  .controller('NavbarController', NavbarController);
