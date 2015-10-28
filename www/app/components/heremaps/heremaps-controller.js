"use strict";

angular.module("ngapp").controller("HereMapsController", function(shared, $state, $scope, $interval, $cordovaGeolocation){

  var ctrl = this;


  // Start Variable Definition
  ctrl.address = null;

  var count = 1;

  var clock;

  var lat = shared.position.lat;

  var long = shared.position.long;

  var markers = shared.mapObjects.markers;
  // End Variable Definition


  // Start Common Functions
  ctrl.back = function(){
    $state.go("main");
  };
  // End Common Functions


  // Start Hold To Mark Controller
  var startCount = function(event){
    count = 1;
    if ( angular.isDefined(clock) ) return;
    clock = $interval(function() {
      if(count > 0){
        count = count - 1;
      } else{
        addMarker(event);
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


  // Start HereMaps Map Controller
  if(lat == null || long == null){
    lat = -23.56;
    long = -46.65;
  }

  var platform = new H.service.Platform({
    'app_id': 'v5H8GDY80pOoZRBVluHh',
    'app_code': 'TnSH70mwUwhsh4VMAXnngw'
  });

  var defaultLayers = platform.createDefaultLayers();

  var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    {
      zoom: 15,
      center: { lat: lat, lng: long },
      pixelRatio: 2
    }
  );

  var mapEvents = new H.mapevents.MapEvents(map);

  var behavior = new H.mapevents.Behavior(mapEvents);

  map.addEventListener('pointerdown', function(event) {
    var target = event.target;
    $scope.target = null;
    if (target instanceof mapsjs.map.Marker) {
      $scope.target = event.target;
      target.setPosition({lat: target.getPosition().lat + 0.001, lng: target.getPosition().lng});
      $scope.dragen = 1;
    } else{
      startCount(event);
    }
  });

  map.addEventListener('pointerup', function(event) {
    if ($scope.target instanceof mapsjs.map.Marker) {
      if($scope.dragen == 1){
        $scope.target.setPosition({lat: $scope.target.getPosition().lat - 0.002, lng: $scope.target.getPosition().lng}); //back if it didn't move
      }
    }
    stopCount();
  });

  map.addEventListener('dragstart', function(ev) {
    stopCount();
    var target = ev.target;
    if (target instanceof H.map.Marker) {
      behavior.disable();
    }
  }, false);

  map.addEventListener('dragend', function(ev) {
    var target = ev.target;
    if (target instanceof mapsjs.map.Marker) {
      behavior.enable();
    }
  }, false);

  map.addEventListener('drag', function(ev) {
    var target = ev.target,
        pointer = ev.currentPointer;
    if (target instanceof mapsjs.map.Marker) {
      $scope.dragen = 0;
      target.setPosition(map.screenToGeo(pointer.viewportX, pointer.viewportY));
      target.setPosition({lat: target.getPosition().lat + 0.002, lng: target.getPosition().lng});
    }
  }, false);

  if(shared.mapObjects.hMarkers.length != 0){
    var leng = shared.mapObjects.hMarkers.length;
    for(var i = 0; i < leng; i++){
      map.addObject(shared.mapObjects.hMarkers[i]);
    }
  }

  var addMarker = function(event){
    var latLng = map.screenToGeo(
      event.currentPointer.viewportX,
      event.currentPointer.viewportY
    );

    var marker = new H.map.Marker({lat: latLng.lat, lng: latLng.lng});

    marker.draggable = true;

    shared.mapObjects.hMarkers.push(marker);

    map.addObject(marker);
  };

  var DistPZoom = function(target){
    if(ctrl.map.zoom > 0 && ctrl.map.zoom <= 5){

    } else if(ctrl.map.zoom == 6){
      target.setPosition({lat: target.getPosition().lat + 1, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 7){
      target.setPosition({lat: target.getPosition().lat + 0.5, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 8){
      target.setPosition({lat: target.getPosition().lat + 0.3, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 9){
      target.setPosition({lat: target.getPosition().lat + 0.15, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 10){
      target.setPosition({lat: target.getPosition().lat + 0.08, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 11){
      target.setPosition({lat: target.getPosition().lat + 0.03, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 12){
      target.setPosition({lat: target.getPosition().lat + 0.02, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 13){
      target.setPosition({lat: target.getPosition().lat + 0.01, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 14){
      target.setPosition({lat: target.getPosition().lat + 0.005, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 15){
      target.setPosition({lat: target.getPosition().lat + 0.002, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 16){
      target.setPosition({lat: target.getPosition().lat + 0.0015, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 17){
      target.setPosition({lat: target.getPosition().lat + 0.001, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 18){
      target.setPosition({lat: target.getPosition().lat + 0.0005, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 19){
      target.setPosition({lat: target.getPosition().lat + 0.0002, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 20){
      target.setPosition({lat: target.getPosition().lat + 0.0001, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 21){
      target.setPosition({lat: target.getPosition().lat + 0.00005, lng: target.getPosition().lng});
    }
  };

  var UndoDistPZoom = function(event){
    if(ctrl.map.zoom > 0 && ctrl.map.zoom <= 5){

    } else if(ctrl.map.zoom == 6){
      target.setPosition({lat: target.getPosition().lat - 1, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 7){
      target.setPosition({lat: target.getPosition().lat - 0.5, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 8){
      target.setPosition({lat: target.getPosition().lat - 0.3, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 9){
      target.setPosition({lat: target.getPosition().lat - 0.15, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 10){
      target.setPosition({lat: target.getPosition().lat - 0.08, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 11){
      target.setPosition({lat: target.getPosition().lat - 0.03, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 12){
      target.setPosition({lat: target.getPosition().lat - 0.02, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 13){
      target.setPosition({lat: target.getPosition().lat - 0.01, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 14){
      target.setPosition({lat: target.getPosition().lat - 0.005, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 15){
      target.setPosition({lat: target.getPosition().lat - 0.002, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 16){
      target.setPosition({lat: target.getPosition().lat - 0.0015, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 17){
      target.setPosition({lat: target.getPosition().lat - 0.001, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 18){
      target.setPosition({lat: target.getPosition().lat - 0.0005, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 19){
      target.setPosition({lat: target.getPosition().lat - 0.0002, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 20){
      target.setPosition({lat: target.getPosition().lat - 0.0001, lng: target.getPosition().lng});
    } else if(ctrl.map.zoom == 21){
      target.setPosition({lat: target.getPosition().lat - 0.00005, lng: target.getPosition().lng});
    }
  };

  var geocoder = platform.getGeocodingService();
  ctrl.searchAddress = function(){
    var geocodingParams = {
      searchText: ctrl.address
    };
    console.log("Searching for: " + ctrl.address);
    geocoder.geocode(geocodingParams,
      function(data){
        console.log("Success: " + data.Response.View[0].Result[0]);
        map.setCenter({lat: data.Response.View[0].Result[0].Location.DisplayPosition.Latitude, lng: data.Response.View[0].Result[0].Location.DisplayPosition.Longitude});
      }, function(err) {
        console.log("Erro: " + err);
      }
    );
  };
  // End HereMaps Map Controller


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
         shared.position.lat  = position.coords.latitude.toPrecision;
         shared.position.long = position.coords.longitude.toPrecision;

         lat = shared.position.lat;
         long = shared.position.long;
         ctrl.map.setCenter({lat: lat, lng: long});
       }
     }
    );
  }, false);
  // End Geolocation Watch Controller


  // Start Common Watchs
  $scope.$watch("$state.current.title", function() {
    if(ctrl.title != $state.current.title){
      ctrl.title = $state.current.title;
    }
  }, true);
  // End Common Watchs
});
