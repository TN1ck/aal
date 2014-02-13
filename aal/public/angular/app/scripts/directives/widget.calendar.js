'use strict';

/* global angular, moment, $ */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function($timeout,$modal, TextTransmission, $compile) {

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

      TextTransmission.fetchTextForWall(function(data) {
        console.log('Data in fetchTextForWall: ', data);
        if(data.data === 'addCalendarEntry'){
          try {
            $scope.addCalendarEntry();
          } catch (e) {

          }
        }
      });

      $scope.addCalendarEntry = function() {

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


      
      $scope.lastShownCalEntry = null;

      //Popover shall disappear if the element looses "focus"
      // $scope.$watchCollection('$scope.lastShownCalEntry',
      //   function(newVal,oldVal) {
      //     console.log('Im in the correct watch  method.');
      //     if(!(newVal.hasClass('border'))){
      //       console.log('IT has NOT the class border');
      //       newVal.popover('hide');
      //     }
      //   }
      // );

      $scope.showCalendarEntry = function(evnt, data) {

        var $target = $(evnt.currentTarget);
        var placement = function (el) {
          if (el.position().top < 140){
            return 'bottom';
          } else {
            return 'top';
          }
        };
        // Replaces the priority with adequate colored square
        var priorityFilter = function(text) {
          switch (text) {
          case 'red':
            return '<div style="width: .8em; height: .8em; background-color: red;margin-top: .2em; margin-bottom: .4em"> </div>';
          case 'orange':
            return '<div style="width: .8em; height: .8em; background-color: orange;margin-top: .2em; margin-bottom: .4em"> </div>';
          case 'green':
            return '<div style="width: .8em; height: .8em; background-color: green;margin-top: .2em; margin-bottom: .4em"> </div>';
          }
        };

        if ($scope.lastShownCalEntry !== null && !$target.is($scope.lastShownCalEntry)) {
          console.log('I am in if case and have to hide the popover of: ', $scope.lastShownCalEntry);
          $scope.lastShownCalEntry.popover('hide');
        }

        var content = '<div class="col-md-12 row"><div class="popovertext"><div class="col-md-3">Location:</div><div class="col-md-9">' + data.location + '</div><div class="col-md-3">Priority:</div><div class="col-md-9">' + priorityFilter(data.priority) + '</div><div class="col-md-3">Category:</div><div class="col-md-9">' + data.category + '</div><div class="col-md-3">Start:</div><div class="col-md-9">' + moment(data.startDate).format('D.M H:mm') + '</div><div class="col-md-3">End:</div><div class="col-md-9">' + moment(data.endDate).format('D.M H:mm') + '</div><div class="col-md-12"><button id="{{data.id}}"class="btn btn-primary full-width popovertext {{css}}" ng-click="$parent.removeCalendarEntry(data)">Remove</button></div></div></div>';
        $target.popover({
          placement : placement($target),
          title : data.text, //this is the top title bar of the popover. add some basic css
          html: 'true', // needed to show html of course
          content : function() {
                      return $compile($(content).html())($target.scope());
                    },
          container: 'body',
          trigger: 'manual'
        });
        $target.popover('toggle');
        $scope.lastShownCalEntry = $target;

      };


      $scope.removeCalendarEntry = function(data) {
        console.log('I am in removeCalendarEntry and this is my data: ', data);
        $scope.lastShownCalEntry.popover('hide');
        $scope.data.forEach(function (element,index,array) {
          console.log('Current element: ', element);
          if( JSON.stringify(element) === JSON.stringify(data)){
            console.log('I can now remove');
            $scope.data.splice(index, 1);
          }
        });
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