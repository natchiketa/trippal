'use strict';
(function(){

class TripsComponent {
  constructor($http) {
    this.$http = $http;
    this.trips = [];
  }

  $onInit() {
    this.$http.get('/api/trips').then(response => {
      this.trips = response.data;
    });
  }

  addTrip() {
    if (this.newTrip) {
      this.$http.post('/api/trips', { name: this.newTrip });
      this.newTrip = '';
    }
  }

  updateTrip(trip) {
    this.$http.put('/api/trips/' + trip._id);
  }

  deleteTrip(trip) {
    this.$http.delete('/api/trips/' + trip._id);
  }
}

angular.module('trippalApp')
  .component('trips', {
    templateUrl: 'app/trips/trips.html',
    controller: TripsComponent
  });

})();
