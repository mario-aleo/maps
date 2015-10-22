"use strict";

angular.module("ngapp").controller("GoogleMapsController", function(shared, $state, $scope, $interval, $cordovaGeolocation){

  var ctrl = this;


  // Start Variable Definition
  var count = 1;

  var clock;

  ctrl.map;

  var lat = shared.position.lat;

  var long = shared.position.long;

  var markers = [];
  // End Variable Definition


  // Start Common Functions
  ctrl.back = function(){
    $state.go("main");
  };
  // End Common Functions


  // Start Hold To Mark Controller
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
  // End Hold To Mark Controller


  // Start Geolocation Watch Controller
  document.addEventListener("deviceready", function () {
    var watchOptions = {
       timeout : 3000,
       enableHighAccuracy: false // may cause errors if true
     };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
     null,
     function(err) {
       // error
     },
     function(position) {
       shared.position.lat  = position.coords.latitude;
       shared.position.long = position.coords.longitude;

       lat = shared.position.lat;
       long = shared.position.long;

       ctrl.map.center.lat = lat;
       ctrl.map.center.long = long;
     }
    );

    watch.clearWatch();
  }, false);
  // End Geolocation Watch Controller


  // Start GoogleMaps Map Controller
  function initMap() {
    if(lat == null || long == null){
      var center = { lat: -23.56, lng: -46.65 };
    } else{
      var center = { lat: lat, lng: long };
    }

    ctrl.map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      zoom: 12,
      center: center
    });

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
  // Start GoogleMaps Map Controller


  // Start Common Watchs
  $scope.$watch("$state.current.title", function() {
    if(ctrl.title != $state.current.title){
      ctrl.title = $state.current.title;
    }
  }, true);
  // End Common Watchs
});
