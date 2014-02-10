'use strict';

/* global angular, moment */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function($timeout,$modal) {

  return {
    templateUrl: '/views/widgets/calendar/widget.calendar.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    },
    link: function(scope) {
      console.log('Whole widgetCalendarData: ', scope.data);

      scope.new = function() {

        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.calendar.html',
          controller: 'ModalCalendarCtrl'
        });

        WidgetModal.result.then(function(data){
          //TODO: Make new calender entry.
        });
      };

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