'use strict';

/* global angular, moment */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function() {
    return {
        templateUrl: '/views/templates/widget.calendar.html',
        restrict: 'E',
        scope: {
          data: '=',
        },
        link: function(scope) {

          scope.color = '#FFBB33';

          moment.lang('de');

          scope.days = [];
          scope.moment = moment;
          scope.date = moment().format('LL');

          for (var i = 0; i < 7; i++) {
            scope.days.push((moment().add('days', i)).calendar().split(' ')[0]);
          }
        }
      };
  });