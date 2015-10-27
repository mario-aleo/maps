"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/main");

    $stateProvider.state("main", {
      url: "/main",
      templateUrl: "app/components/main/main.html",
      title: "Menu",
      controller: "MainController",
      controllerAs: "main"
    })
    .state("nggooglemaps", {
      url: "/nggooglemaps",
      templateUrl: "app/components/nggooglemaps/nggooglemaps.html",
      title: "GoogleMaps",
      controller: "NgGoogleMapsController",
      controllerAs: "ngmaps"
    })
    .state("heremaps", {
      url: "/heremaps",
      templateUrl: "app/components/heremaps/heremaps.html",
      title: "HereMaps",
      controller: "HereMapsController",
      controllerAs: "here"
    });

}]);
