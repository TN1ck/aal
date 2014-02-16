'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetMail', function(TextTransmission) {
  return {
    templateUrl: '/views/widgets/widget.mail.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },

    link: function($scope) {
	    TextTransmission.fetchDataForWall(function(data) {
				$scope.data = data;
	    },$scope.socket);
		}
  };
});