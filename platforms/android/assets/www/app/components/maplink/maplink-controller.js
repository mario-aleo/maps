"use strict";

angular.module("ngapp").controller("MapLinkController", function(shared, $state, $scope, $interval, $cordovaGeolocation){

  var ctrl = this;

  // Start Variable Definition
  var count = 1;

  var clock;

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
  var startCount = function(e){
    count = 1;
    if ( angular.isDefined(clock) ) return;
    clock = $interval(function() {
      if(count > 0){
        count = count - 1;
      } else{
        alert("Add");
        addMarker(e.object.latlng);
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
     });

     watch.clearWatch();
   }, false)
   // End Geolocation Watch Controller


  // Start MapLink Map Controller
  var divIdName = "divMap";

  var map = new MMap2(divIdName);
  if(lat == null || long == null){
    var point = new MPoint(-46.6520066, -23.5650127);
  } else{
    var point = new MPoint(long, lat);
  }
  var zoomLevel = 14;

  map.setCenter(point, zoomLevel);

  //var smallMapControl = new GSmallMapControl();
  //map.addControl(smallMapControl);
  // End MapLink Map Controller


  // Start Common Watchs
  $scope.$watch("$state.current.title", function() {
    ctrl.title = $state.current.title;
    $scope.$apply();
  }, true);
  // End Common Watchs
});
