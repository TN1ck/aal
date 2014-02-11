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
    link: function($scope) {
      console.log('Whole widgetCalendarData: ', $scope.data);

      $scope.new = function() {

        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.calendar.html',
          controller: 'ModalCalendarCtrl'
        });

        WidgetModal.result.then(function(data){
          //TODO: Make new calender entry.
        
          data.startDate.setHours(data.startTime.getHours());
          data.startDate.setMinutes(data.startTime.getMinutes());
          data.startDate.setDate(data.startDate.getDate()+1);

          data.endDate.setHours(data.endTime.getHours());
          data.endDate.setMinutes(data.endTime.getMinutes());
          data.endDate.setDate(data.endDate.getDate()+1);

          $scope.data.push({category: data.category, text: data.text, location: data.location, priority: data.priority,startDate: data.startDate, endDate: data.endDate});

        });
      };

      var testelement = $('#topentry');
      $scope.showCalendarEntry = function($event,data) {
        var el1 = angular.element($event.srcElement);
        var el = $event.target;
        console.log('El: ', el, 'Evnt: ', $event, 'El1: ', el1);
        el1.popover({
          placement : 'right',
          title : '<div style="text-align:center; color:red; text-decoration:underline; font-size:14px;"> Muah ha ha</div>', //this is the top title bar of the popover. add some basic css
          html: 'true', //needed to show html of course
          content : 'CONTENT'
        });
        console.log('El: ', el1);
        el1.addClass('red');
        el1.popover('show');
        console.log('showCalendarEntry: ' , el, testelement, data);
      };

      moment.lang('de');
      
      // update time every second
      var setTime = function() {
        $scope.time = moment().format('D.M H:mm');
        $timeout(setTime, 1000);
      };

      setTime();
      $scope.moment = moment;
    }
  };
});