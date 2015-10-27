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
    .state("googlemaps", {
      url: "/googlemaps",
      templateUrl: "app/components/googlemaps/googlemaps.html",
      title: "GoogleMaps",
      controller: "GoogleMapsController",
      controllerAs: "maps"
    })
    .state("nggooglemaps", {
      url: "/nggooglemaps",
      templateUrl: "app/components/nggooglemaps/nggooglemaps.html",
      title: "GoogleMaps",
      controller: "NgGoogleMapsController",
      controllerAs: "ngmaps"
    })
    .state("maplink", {
      url: "/maplink",
      templateUrl: "app/components/maplink/maplink.html",
      title: "MapLink",
      controller: "MapLinkController",
      controllerAs: "link"
    })
    .state("heremaps", {
      url: "/heremaps",
      templateUrl: "app/components/heremaps/heremaps.html",
      title: "HereMaps",
      controller: "HereMapsController",
      controllerAs: "here"
    });

}]);
