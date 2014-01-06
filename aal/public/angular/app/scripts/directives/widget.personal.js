'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetPersonal', function() {
    return {
        templateUrl: '/views/templates/widget.personal.html',
        restrict: 'E',
        scope: {
            user: '=',
          }
        };
  });