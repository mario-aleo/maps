"use strict";

angular.module("ngapp").controller("MapLinkController", function(shared, $state, $scope, $cordovaGeolocation){

  var ctrl = this;

  // Start Variable Definition
  var lat = shared.position.lat;

  var long = shared.position.long;
  // End Variable Definition


  // Start Common Functions
  ctrl.back = function(){
    $state.go("main");
  };
  // End Common Functions


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
           shared.position.lat  = position.coords.latitude;
           shared.position.long = position.coords.longitude;

           lat = shared.position.lat;
           long = shared.position.long;
           map.setCenter(new MPoint(long, lat), zoomLevel);
         }
     });
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
  var zoomLevel = 1;

  map.setCenter(point, zoomLevel);
  // End MapLink Map Controller

  /*LBS.Event.addListener(map, "click", function (e) {
    var point = new MMarker(map.getLatLngFromPixel(e.xy));
    map.addMarker(point);
  });*/

  for(var i = 0; i < 9999; i++){
    var marker = new MMarker(new MPoint((-180 + (i/4)), (-90 + (i/8))));
    map.addMarker(marker);
    var marker = new MMarker(new MPoint((180 - (i/4)), (-90 + (i/8))));
    map.addMarker(marker);
  }

  // Start Common Watchs
  $scope.$watch("$state.current.title", function() {
    ctrl.title = $state.current.title;
  }, true);
  // End Common Watchs
});
