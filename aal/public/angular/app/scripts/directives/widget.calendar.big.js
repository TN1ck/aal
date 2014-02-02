'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetCalendarBig', function() {

  return {
    templateUrl: '/views/widgets/calendar/widget.calendar.big.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});