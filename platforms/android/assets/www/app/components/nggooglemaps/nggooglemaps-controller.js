"use strict";

angular.module("ngapp").controller("NgGoogleMapsController", function(shared, $state, $scope, $interval, $cordovaGeolocation, uiGmapGoogleMapApi){

  var ctrl = this;


  // Start Variable Definition
  ctrl.map;

  ctrl.markers = shared.mapObjects.ngMarkers;

  var count = 1;

  var clock;

  var lat = shared.position.lat;

  var long = shared.position.long;
  // End Variable Definition


  // Start Common Functions
  ctrl.back = function(){
    $state.go("main");
  };
  // End Common Functions


  // Start Hold To Mark Controller
  var startCount = function(args){
    count = 1;
    if ( angular.isDefined(clock) ) return;
    clock = $interval(function() {
      if(count > 0){
        count = count - 1;
      } else{
        addMarker(args);
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
  uiGmapGoogleMapApi.then(function(maps) {
    if(lat == null || long == null){
      lat = -23.56;
      long = -46.65;
    }

    ctrl.map = {
      center: {
        latitude: lat,
        longitude: long
      },
      zoom: 15,
      markers: ctrl.markers,
      option: {
        disableDefaultUI: true,
        disableDoubleClickZoom: true
      },
      events: {
        mousedown: function (map, eventName, originalEventArgs) {
          var args = originalEventArgs[0];
          startCount(args);
        },
        mouseup: function(){
          stopCount()
        },
        dragstart: function(){
          stopCount()
        }
      }
    }
  });

  function addMarker(args) {
    var marker = {
      id: shared.mapObjects.ngMarkers.length + 1,
      coords: {
        latitude: args.latLng.lat(),
        longitude: args.latLng.lng()
      },
      options: {
        draggable: true,
        animation: window.google.maps.Animation.DROP
      },
      events: {
        mousedown: function(event){
          ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.002; //move the marker to make draggable better
          ctrl.markers[event.key - 1].dragen = 1;
        },
        mouseup: function(event){
          if(ctrl.markers[event.key - 1].dragen == 1){
            ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.002; //back if it didn't move
          }
        },
        dragstart: function(event){
          ctrl.markers[event.key - 1].dragen = 0;
        }
      },
      dragen: 0
    };
    shared.mapObjects.ngMarkers.push(marker);
    ctrl.markers = shared.mapObjects.ngMarkers;
  };
  // End GoogleMaps Map Controller


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
