"use strict";

angular.module("ngapp").service("shared", function(){

    this.position = {
      lat: null,
      long: null
    };

    this.mapObjects = {
      markers: [],
      hMarkers: [],
      ngMarkers: []
    };
});
