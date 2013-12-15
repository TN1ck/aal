'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetSocial', function() {
    return {
        templateUrl: '/views/templates/widget.social.html',
        restrict: 'E',
        scope: {
            social: '=',
          }
        };
  });