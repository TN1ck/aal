'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNewsBig', function() {

  return {
    templateUrl: '/views/widgets/news/widget.news.big.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '='
    }
  };
});