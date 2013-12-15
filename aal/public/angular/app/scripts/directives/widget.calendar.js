'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function() {
    return {
        templateUrl: '/views/templates/widget.calendar.html',
        restrict: 'E',
        scope: {
            events: '=',
          },
          link: function (scope) {

          }
        };
  });