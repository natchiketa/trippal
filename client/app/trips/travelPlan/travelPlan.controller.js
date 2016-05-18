'use strict';
(function(){

class TravelPlanComponent {
  constructor($http) {
    var start = moment().add(1, 'months').date(1);
    var end = moment().add(2, 'months').date(-1);

    $http.get('/api/trips').then(response => {
      this.trips = _.filter(response.data, (trip) => {
          return moment(trip.start_date).isSameOrAfter(start) &&
            moment(trip.start_date).isSameOrBefore(end);
        })
        .map((trip) => {
          trip.start_date = moment(trip.start_date).toDate();
          trip.end_date = moment(trip.end_date).toDate();
          return trip;
        });
    })
    .then(() => {
      _.defer(function() {
        window.print();
      });
    });

  }

  $onInit() {
  }
}

angular.module('trippalApp')
  .component('travelPlan', {
    templateUrl: 'app/trips/travelPlan/travelPlan.html',
    controller: TravelPlanComponent
  });

})();
