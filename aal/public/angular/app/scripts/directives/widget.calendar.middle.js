'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetCalendarMiddle', function() {

  return {
    templateUrl: '/views/widgets/calendar/widget.calendar.middle.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});