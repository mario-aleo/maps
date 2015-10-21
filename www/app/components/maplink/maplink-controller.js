"use strict";

angular.module("ngapp").controller("MapLinkController", function(shared, $state, $scope){

  var ctrl = this;


  ctrl.back = function(){
    $state.go("main");
  }

  // Start MapLink Map Controller
  var divIdName = "divMap";

  var map = new MMap2(divIdName);
  var point = new MPoint(-46.6520066, -23.5650127);
  var zoomLevel = 14;

  map.setCenter(point, zoomLevel);
  //End MapLink Map Controller

  $scope.$watch("$state.current.title", function() {
    ctrl.title = $state.current.title;
    $scope.$apply();
  }, true);
});
