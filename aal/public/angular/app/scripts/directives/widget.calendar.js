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
          link: function(scope) {

            moment.lang('de');

            scope.days = [];
            scope.moment = moment;
            scope.date = moment().format('LL');

            for (var i = 0; i < 7; i++) {
              scope.days.push((moment().add('days', i)).calendar().split(' ')[0]);
            }

            // for easy filtering add the weekday
            scope.events = scope.events.map(function(event) {
                
                event.weekday = moment(event.start).calendar().split(' ')[0];
                return event;

              });
          }
        };
  });