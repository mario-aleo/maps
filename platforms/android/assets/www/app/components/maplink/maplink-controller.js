"use strict";

angular.module("ngapp").controller("MapLinkController", function(shared, $state, $scope, $cordovaGeolocation){

  var ctrl = this;


  var lat = shared.position.lat;


  var long = shared.position.long;


  ctrl.back = function(){
    $state.go("main");
  };


  /*document.addEventListener("deviceready", function () {
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
   }, false)*/


  // Start MapLink Map Controller
  var divIdName = "divMap";


  var map = new MMap2(divIdName);
  alert(lat + " " + long);
  if(lat == null || long == null){
    var point = new MPoint(-46.6520066, -23.5650127);
  } else{
    var point = new MPoint(long, lat);
  }

  var zoomLevel = 14;


  map.setCenter(point, zoomLevel);
  //End MapLink Map Controller

  $scope.$watch("$state.current.title", function() {
    ctrl.title = $state.current.title;
    $scope.$apply();
  }, true);
});
