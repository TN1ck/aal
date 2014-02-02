'use strict';

/* global angular, moment */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function($timeout) {
    return {
        templateUrl: '/views/widgets/calendar/widget.calendar.html',
        restrict: 'E',
        scope: {
          data: '=',
          color: '=',
          css: '='
        },
        link: function(scope) {

          moment.lang('de');
          
          // update time every second
          var setTime = function() {
            scope.time = moment().format('D.M H:mm');
            $timeout(setTime, 1000);
          };

          setTime();
          scope.moment = moment;
        }
      };
  });