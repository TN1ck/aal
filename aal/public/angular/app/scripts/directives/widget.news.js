'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket, TextTransmission, $http) {

  return {
    templateUrl: '/views/widgets/news/widget.news.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    link: function($scope) {
			TextTransmission.fetchDataForWall(function(data) {
				$scope.data = data.data;
			}, $scope.socket);
      
      // should be changed later
      $http.get('/newsitems', function() {});
		}
  };
});