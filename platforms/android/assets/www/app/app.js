"use strict";

angular.module("ngapp", [ "ngTouch", "ui.router", "ngMdIcons", "ngMaterial", "ngCordova", 'uiGmapgoogle-maps'])

.run(function($rootScope, $cordovaDevice){
    document.addEventListener("deviceready", function () {
        $rootScope.$watch("window.StatusBar", function() {
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByName("black");
            $rootScope.$apply();
        });
    }, false);

});
