'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetCalendarSmall', function() {

  return {
    templateUrl: '/views/widgets/calendar/widget.calendar.small.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '='
    }
  };
});