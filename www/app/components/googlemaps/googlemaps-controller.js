"use strict";

angular.module("ngapp").controller("GoogleMapsController", function(shared, $state, $scope, $interval){

  var ctrl = this;


  var count = 1;


  var clock;


  ctrl.back = function(){
    $state.go("main");
  }

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  $scope.map;
  function initMap() {
    var bangalore = { lat: 12.97, lng: 77.59 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: bangalore
    });

    var startCount = function(event){

      count = 1;

      if ( angular.isDefined(clock) ) return;

        clock = $interval(function() {
          if(count > 0){
            count = count - 1;
          } else{
            addMarker(event.latLng, map);
            stopCount();
          }
        }, 500);

    };


    var stopCount = function(){
      if (angular.isDefined(clock)) {
        $interval.cancel(clock);
        clock = undefined;
      }
    };


    $scope.$on('$destroy', function() {
      stopCount();
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'mousedown', function(event) {
      startCount(event);
    });

    google.maps.event.addListener(map, 'mouseup', function(event) {
      stopCount();
    });

    google.maps.event.addListener(map, 'dragstart', function(event) {
      stopCount();
    });

    // Add a marker at the center of the map.
    addMarker(bangalore, map);
  }

  // Adds a marker to the map.
  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map
    });
}


  initMap();


  $scope.$watch("$state.current.title", function() {
    ctrl.title = $state.current.title;
    $scope.$apply();
  }, true);
});
