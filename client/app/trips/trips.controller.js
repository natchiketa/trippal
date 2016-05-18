'use strict';

(function(){

class TripsComponent {
  constructor($http, User, Auth) {
    this.$http = $http;
    this.trips = [];
    this.newTrip = blankTrip();
    this.moment = moment;
    this.isAdmin = Auth.isAdmin;
    this.users = User.query();
  }

  $onInit() {
    this.getTrips();
  }

  getTrips() {
    this.$http.get('/api/trips').then(response => {
      this.trips = response.data.map((trip) => {
        trip.start_date = moment(trip.start_date).toDate();
        trip.end_date = moment(trip.end_date).toDate();
        return trip;
      });
    });
  }

  addTrip() {
    this.$http.post('/api/trips', this.newTrip)
    .then(this.getTrips());

    this.newTrip = '';
  }

  updateTrip() {
    this.$http.put(`/api/trips/${this.activeTrip._id}`, this.activeTrip)
    .then(this.getTrips());

    this.activeTrip = null;
  }

  deleteTrip(trip) {
    this.$http.delete(`/api/trips/${trip._id}`)
    .then(this.getTrips());
  }

  getUser(userId) {
    return _.find(this.users, (user) => user._id === userId);
  }

  editTrip(trip) {
    this.activeTrip = trip;
  }

  editingTrip(tripId) {
    if(_.get(this, 'activeTrip._id', null) === null) {
      return;
    }

    return this.activeTrip._id === tripId;
  }

  daysUntil(trip) {
    var start = moment(trip.start_date);

    if(start.isBefore(moment())) {
      return;
    }

    return moment().to(start);
  }
}

function blankTrip() {
  return {
    destination: null,
    start_date: moment().weekday(6).toDate(),
    end_date: moment().weekday(8).toDate(),
    comment: null
  }
}

angular.module('trippalApp')
  .component('trips', {
    templateUrl: 'app/trips/trips.html',
    controller: TripsComponent
  });

})();
