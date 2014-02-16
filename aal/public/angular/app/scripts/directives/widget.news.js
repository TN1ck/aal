'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket) {

  return {
    templateUrl: '/views/widgets/news/widget.news.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    }
  };
});