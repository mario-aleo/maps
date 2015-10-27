"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $cordovaGeolocation){

    var ctrl = this;


    // Start Common Functions
    ctrl.goToNgGoogleMaps = function(){
      //window.plugins.orientationLock.unlock()
      $state.go("nggooglemaps");
    };

    ctrl.goToHereMaps = function(){
      //window.plugins.orientationLock.unlock()
      $state.go("heremaps");
    };
    // End Common Functions


    // Start Geolocation Startup
    document.addEventListener("deviceready", function () {
      window.plugins.orientationLock.lock("portrait");

      $cordovaGeolocation
      .getCurrentPosition()
      .then(function (position) {
        shared.position.lat  = position.coords.latitude
        shared.position.long = position.coords.longitude
      }, function(err) {
        // error
      });
    }, false);
    // End Geolocation Startup


    // Start Common Watchs
    $scope.$watch("$state.current.title", function() {
      if(ctrl.title != $state.current.title){
        ctrl.title = $state.current.title;
      }
    }, true);
    // End Common Watchs
});
