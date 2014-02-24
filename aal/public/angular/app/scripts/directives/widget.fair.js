'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetFair', function(TextTransmission, $rootScope, $http) {
  return {
    templateUrl: '/views/widgets/widget.fair.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    link: function($scope) {
			
   //    TextTransmission.fetchDataForWall(function(data) {
   //      $scope.data = data.data;
			// }, $scope.socket);

      console.log('I am the fair widget!');


		}
  };
});