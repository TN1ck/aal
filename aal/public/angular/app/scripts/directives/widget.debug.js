'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetDebug', function(TextTransmission, $rootScope) {

  return {
    templateUrl: '/views/widgets/widget.debug.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    link: function($scope) {

      $scope.r = $rootScope;

      $scope.keys = ['R', 'B', 'SPACE'];
      $scope.gestureCounter = 0;

      // used to show off the pressed keys aka the gestures
      TextTransmission.fetchTextForWall(function(data) {
        console.log('key received: ', data.data);
        $scope.keys.push(data.data);
        $scope.gestureCounter++;
        if ($scope.keys.length > 5) {
          $scope.keys.shift();
        }
      }, 'DEBUG_KEYS');

		}
  };
});