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

      $scope.keys = ['R', 'B', 'SPACE'];
      $scope.gestureCounter = 0;

      // used to show off the pressed keys aka the gestures
      TextTransmission.fetchTextForWall(function(data) {
        $scope.keys.push(data.data);
        $scope.gestureCounter++;
        if ($scope.keys.length > 20) {
          $scope.keys.shift();
        }
      }, $scope.socket + '_KEYS');

		}
  };
});