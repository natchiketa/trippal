'use strict';

describe('Component: TripsComponent', function () {

  // load the controller's module
  beforeEach(module('trippalApp'));

  var TripsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    TripsComponent = $componentController('TripsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
