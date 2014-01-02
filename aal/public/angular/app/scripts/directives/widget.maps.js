'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.directive('widgetMaps', function() {
    return {
        templateUrl: '/views/templates/widget.maps.html',
        restrict: 'E',
        link: function (scope) {

            scope.center = {
                latitude: 46,
                longitude: 7
              };
            scope.zoom = 8;
            scope.clickedLatitude = null;
            scope.clickedLongitude = null;
            scope.refresh = false;

            scope.findMe = function() {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                  scope.center.latitude = pos.coords.latitude;
                  scope.center.longitude = pos.coords.longitude;
                  scope.$apply();
                }, function() {});
              }
            };

            var isFullscreen = function() {
              console.log('woot');
              return $('#widget-maps').parent().parent().hasClass('fullscreen');
            };

            scope.$watch(isFullscreen, function() {
              scope.refresh = !scope.refresh;
            });

            scope.findMe();
          }

      };
  });