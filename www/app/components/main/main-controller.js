"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;


    ctrl.goToGoogleMaps = function(){
      $state.go("googlemaps");
    };


    ctrl.goToMapLink = function(){
      $state.go("maplink");
    };


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


    $scope.$watch("$state.current.title", function() {
      if(ctrl.title != $state.current.title){
        ctrl.title = $state.current.title;
      }
    }, true);
});
