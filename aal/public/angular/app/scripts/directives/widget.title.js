'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTitle', function() {
    return {
        templateUrl: '/views/templates/widget.title.html',
        restrict: 'E',
        transclude: true,
        scope: {
          title: '='
        },
      };
  });