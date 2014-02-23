'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket, TextTransmission, $http, $rootScope) {

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
        console.log('News: ' ,data);
				$scope.data = data.data.news;
			}, $scope.socket);
      
      // should be changed later
      var fetchNews = function() {
        $http.get('/news/');
      };

      // initially fetch the data
      $scope.data = fetchNews();
      console.log('News: ', $scope.data);
		}
  };
});