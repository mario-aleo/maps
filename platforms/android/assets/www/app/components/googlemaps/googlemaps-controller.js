"use strict";

angular.module("ngapp").controller("GoogleMapsController", function(shared, $state, $scope, $interval, $cordovaGeolocation){

  var ctrl = this;


  // Start Variable Definition
  ctrl.map;

  var count = 1;

  var clock;

  var lat = shared.position.lat;

  var long = shared.position.long;

  var markers = shared.mapObjects.markers;
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


  // Start GoogleMaps Map Controller
  function initMap() {
    if(lat == null || long == null){
      var center = { lat: -23.56, lng: -46.65 };
    } else{
      var center = { lat: lat, lng: long };
    }

    ctrl.map = new google.maps.Map(document.getElementById('map'), {
      disableDefaultUI: true,
      zoom: 0,
      center: center
    });

    /*if(shared.mapObjects.markers.length != 0){
      var leng = shared.mapObjects.markers.length;
      for(var i = 0; i < leng; i++){
        shared.mapObjects.markers[i].setMap(ctrl.map);
      }
    }*/
    var marker;
    for(var i = 0; i < 9999; i++){
      marker = new google.maps.Marker({
        position: new google.maps.LatLng((-90 + (i/8)), (-180 + (i/4)))
      });
      marker.setMap(ctrl.map);
      marker = new google.maps.Marker({
        position: new google.maps.LatLng((-90 + (i/8)), (180 - (i/4)))
      });
      marker.setMap(ctrl.map);
    }

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
    shared.mapObjects.markers.push(marker);
  };

  initMap();
  // Start GoogleMaps Map Controller


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
       if(position.coords.latitude.toPrecision(5) != lat.toPrecision(5)  || position.coords.longitude.toPrecision(5) != long.toPrecision(5)){
         shared.position.lat  = position.coords.latitude.toPrecision;
         shared.position.long = position.coords.longitude.toPrecision;

         lat = shared.position.lat;
         long = shared.position.long;
         ctrl.map.setCenter({lat: lat, lng: long});
       }
     }
    );


  }, false);
  // End Geolocation Watch Controller


  // Start Common Watchs
  $scope.$watch("$state.current.title", function() {
    if(ctrl.title != $state.current.title){
      ctrl.title = $state.current.title;
    }
  }, true);
  // End Common Watchs
});
