'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetMaps', function() {
    return {
        templateUrl: '/views/templates/widget.maps.html',
        restrict: 'E',
        controller: function ($scope) {
            $scope.center = {
                latitude: 46,
                longitude: 7
            };
            $scope.zoom = 8;
            $scope.clickedLatitude = null;
            $scope.clickedLongitude = null;
            $scope.findMe = function() {
              if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
                  $scope.center.latitude = pos.coords.latitude;
                  $scope.center.longitude = pos.coords.longitude;
                  $scope.$apply();
              }, function(error) {});
            };
            $scope.findMe();

            $scope.shouldRefresh = false;

            var fitMap = function() {
              var scaleFactor = 0.9;
              var sizeOfParent = scaleFactor * $('#widget-maps').parent().height();
              var normalSize = 400;
              var sizeToUse;
              if ($('#widget-maps').parent().parent().hasClass('fullscreen')) {
                sizeToUse = sizeOfParent;
              } else {
                sizeToUse = normalSize;
              }
              $('#google-map').css('height', sizeToUse);
              $scope.shouldRefresh = true;
              $scope.$apply();
              setTimeout(function() {
                $scope.shouldRefresh = false;
                $scope.$apply();
              }, 1000);
            };

            $(window).resize(fitMap);
            $(document).ready(function() {
              setTimeout(function() {
                fitMap();
              }, 1000);
            });
        }
  }
});