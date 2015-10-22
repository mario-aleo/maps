"use strict";

angular.module("ngapp").controller("GoogleMapsController", function(shared, $state, $scope, $interval){

  var ctrl = this;


  var count = 1;


  var clock;


  ctrl.map;


  var markers = [];


  ctrl.back = function(){
    $state.go("main");
  };


  var startCount = function(event){
    count = 1;
    if ( angular.isDefined(clock) ) return;
    clock = $interval(function() {
      if(count > 0){
        count = count - 1;
      } else{
        addMarker(event.latLng);
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



  function initMap() {
    var defaultCenter = { lat: -23.56, lng: -46.65 };
    ctrl.map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      zoom: 12,
      center: defaultCenter
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(ctrl.map, 'mousedown', function(event) {
      startCount(event);
    });

    google.maps.event.addListener(ctrl.map, 'mouseup', function(event) {
      stopCount();
    });

    google.maps.event.addListener(ctrl.map, 'dragstart', function(event) {
      stopCount();
    });
  };

  // Adds a marker to the map.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      draggable: true,
      position: location,
      map: ctrl.map
    });
    markers.push(marker);
  };


  initMap();


  $scope.$watch("$state.current.title", function() {
    if(ctrl.title != $state.current.title){
      ctrl.title = $state.current.title;
    }
  }, true);
});
