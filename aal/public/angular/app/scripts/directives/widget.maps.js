'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetMaps', function() {
    return {
        templateUrl: '/views/templates/widget.maps.html',
        restrict: 'E',
        controller: function ($scope) {
            $scope.center = {
                latitude: 45,
                longitude: -73
            };
            $scope.zoom = 8;
            $scope.clickedLatitude = null;
            $scope.clickedLongitude = null;
            $scope.findMe = function() {
              if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
                  $scope.center.latitude = pos.coords.latitude;
                  $scope.center.longitude = pos.coords.longitude;
                  $scope.$apply()
              }, function(error) {
                  // ...
              });
            };
        }
  }
});