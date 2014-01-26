'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetPersonal', function() {
  return {
    templateUrl: '/views/widgets/widget.personal.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '='
    }
  };
});