'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNewsSmall', function() {

  return {
    templateUrl: '/views/widgets/news/widget.news.small.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});