'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket, TextTransmission, $http, $rootScope, $modal) {

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
				$scope.data = data.data.news;
			}, $scope.socket);
      
      // should be changed later
      var fetchNews = function() {
        $http.get('/news/');
      };

      $scope.displayNews = function(evnt, data) {
        var $target = $(evnt.currentTarget);

        console.log('Data in displayNews: ' , data);
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/modals/modal.news.html',
          scope: $target.scope()
        });
      };

      // initially fetch the data
      $scope.data = fetchNews();
      console.log('News: ', $scope.data);
		}
  };
});