'use strict';

/* global angular, moment */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function() {
    return {
        templateUrl: '/views/templates/widget.calendar.html',
        restrict: 'E',
        scope: {
            events: '=',
          },
          link: function (scope) {

            scope.days = [];
            scope.moment = moment;

            for (var i = 0; i < 7; i++) {
              scope.days.push((moment().add('days', i)).calendar().split(" ")[0]);
            }

            scope.events = scope.events.map(function (event) {
                event.weekday = moment(event.start).calendar().split(" ")[0];
                return event;
              });
          }
        };
  });