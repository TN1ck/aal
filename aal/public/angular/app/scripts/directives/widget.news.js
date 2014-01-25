'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket) {

  return {
    templateUrl: '/views/templates/widget.news.html',
    restrict: 'E',
    scope: {
      data: '=',
    },
    link: function(scope) {
      scope.color = '#B9DC51';
    }
  };
});