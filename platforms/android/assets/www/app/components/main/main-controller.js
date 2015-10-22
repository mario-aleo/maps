"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaGeolocation){

    var ctrl = this;


    // Start Common Functions
    ctrl.goToGoogleMaps = function(){
      window.plugins.orientationLock.unlock()
      $state.go("googlemaps");
    };

    ctrl.goToMapLink = function(){
      window.plugins.orientationLock.unlock()
      $state.go("maplink");
    };
    // End Common Functions


    /*ctrl.toggle = angular.noop;


    ctrl.isOpen = function() { return false };
    $mdComponentRegistry
    .when("right")
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });


    ctrl.toggleRight = function() {
    $mdSidenav("right").toggle()
        .then(function(){
        });
    };


    ctrl.close = function() {
    $mdSidenav("right").close()
        .then(function(){
        });
    };*/


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
