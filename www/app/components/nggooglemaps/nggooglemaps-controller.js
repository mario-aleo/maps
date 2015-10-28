"use strict";

angular.module("ngapp").controller("NgGoogleMapsController", function(shared, $state, $scope, $interval, $cordovaGeolocation, uiGmapGoogleMapApi){

  var ctrl = this;


  // Start Variable Definition
  ctrl.map;

  ctrl.markers = shared.mapObjects.ngMarkers;

  ctrl.address;

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
      control: {},
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

  var geocoder;
  geocoder = new google.maps.Geocoder();
  ctrl.searchAddress = function(){
    geocoder.geocode( { 'address': ctrl.address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         ctrl.map.control.refresh({latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng()});
       } else {
         console.log("Geocode was not successful for the following reason: " + status);
       }
     });
   };

  var DistPZoom = function(event){
    if(ctrl.map.zoom > 0 && ctrl.map.zoom <= 5){

    } else if(ctrl.map.zoom == 6){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 1;
    } else if(ctrl.map.zoom == 7){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.5;
    } else if(ctrl.map.zoom == 8){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.3;
    } else if(ctrl.map.zoom == 9){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.15;
    } else if(ctrl.map.zoom == 10){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.08;
    } else if(ctrl.map.zoom == 11){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.03;
    } else if(ctrl.map.zoom == 12){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.02;
    } else if(ctrl.map.zoom == 13){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.01;
    } else if(ctrl.map.zoom == 14){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.005;
    } else if(ctrl.map.zoom == 15){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.002;
    } else if(ctrl.map.zoom == 16){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.0015;
    } else if(ctrl.map.zoom == 17){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.001;
    } else if(ctrl.map.zoom == 18){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.0005;
    } else if(ctrl.map.zoom == 19){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.0002;
    } else if(ctrl.map.zoom == 20){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.0001;
    } else if(ctrl.map.zoom == 21){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.00005;
    }
  };

  var UndoDistPZoom = function(event){
    if(ctrl.map.zoom > 0 && ctrl.map.zoom <= 5){

    } else if(ctrl.map.zoom == 6){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 1;
    } else if(ctrl.map.zoom == 7){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.5;
    } else if(ctrl.map.zoom == 8){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.3;
    } else if(ctrl.map.zoom == 9){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.15;
    } else if(ctrl.map.zoom == 10){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.08;
    } else if(ctrl.map.zoom == 11){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.03;
    } else if(ctrl.map.zoom == 12){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.02;
    } else if(ctrl.map.zoom == 13){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.01;
    } else if(ctrl.map.zoom == 14){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.005;
    } else if(ctrl.map.zoom == 15){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude + 0.002;
    } else if(ctrl.map.zoom == 16){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.0015;
    } else if(ctrl.map.zoom == 17){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.001;
    } else if(ctrl.map.zoom == 18){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.0005;
    } else if(ctrl.map.zoom == 19){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.0002;
    } else if(ctrl.map.zoom == 20){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.0001;
    } else if(ctrl.map.zoom == 21){
      ctrl.markers[event.key - 1].coords.latitude = ctrl.markers[event.key - 1].coords.latitude - 0.00005;
    }
  };

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
          DistPZoom(event);
          ctrl.markers[event.key - 1].dragen = 1;
        },
        mouseup: function(event){
          if(ctrl.markers[event.key - 1].dragen == 1){
            UndoDistPZoom(event);
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

    // Reverse Geolocation Method
    /*var adrs = null;
    var latlng = {lat: args.latLng.lat(), lng: args.latLng.lng()};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          adrs = results[0].formatted_address;
          console.log(adrs);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });*/
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
         ctrl.map.control.refresh({latitude: lat, longitude: long});
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
