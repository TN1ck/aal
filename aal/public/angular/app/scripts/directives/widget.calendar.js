'use strict';

/* global angular, moment */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function($timeout) {
    return {
        templateUrl: '/views/templates/widget.calendar.html',
        restrict: 'E',
        scope: {
          data: '=',
          color: '='
        },
        link: function(scope) {

          moment.lang('de');
          
          // update time every second
          var setTime = function() {
            scope.time = moment().format('D.M H:mm');
            $timeout(setTime, 1000);
          };

          setTime();

          scope.days = [];
          scope.moment = moment;
          scope.date = moment().format('LL');

          for (var i = 0; i < 7; i++) {
            scope.days.push((moment().add('days', i)).calendar().split(' ')[0]);
          }
        }
      };
  });