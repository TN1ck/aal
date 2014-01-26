'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTitle', function() {
    return {
        templateUrl: '/views/widgets/widget.title.html',
        restrict: 'E',
        transclude: true,
        scope: {
          title: '='
        },
      };
  });