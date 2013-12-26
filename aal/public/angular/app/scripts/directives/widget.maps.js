'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetMaps', function() {
    return {
        templateUrl: '/views/templates/widget.maps.html',
        restrict: 'E',
        controller: function ($scope) {
          angular.extend($scope, {
              center: {
                  latitude: 45,
                  longitude: -73
              },
              bar: 'spam',
              zoom: 8,
              clickedLatitude: null,
              clickedLongitude: null,
          });
        }
  }
});