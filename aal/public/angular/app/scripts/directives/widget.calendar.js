'use strict';

/* global angular, moment, $ */

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
      var popoverToggle = true;
      $scope.showCalendarEntry = function(evnt, data) {
        var $target = $(evnt.currentTarget);
        console.log(popoverToggle);
        //console.log($target.popover);
        if (popoverToggle){
          console.log('I am in IF!');
          var content = '<div class="col-md-12 row" style="font-size: 1.5em; margin-bottom: 0.5em"><div class="col-md-3">Location:</div><div class="col-md-9">' + data.location + '</div><div class="col-md-3">Priority:</div><div class="col-md-9">' + data.priority + '</div><div class="col-md-3">Category:</div><div class="col-md-9">' + data.category + '</div></div>';
          $target.popover({
            placement : 'bottom',
            title : data.text, //this is the top title bar of the popover. add some basic css
            html: 'true', // needed to show html of course
            content : content
          });
          $target.popover('show');
          popoverToggle = !popoverToggle;
        } else {
          console.log('I  am in ELSE!');
          // $target.popover('toggle');
          evnt.stopPropagation();
          //popoverToggle = !popoverToggle;
        }
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