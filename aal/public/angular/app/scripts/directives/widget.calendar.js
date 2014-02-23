'use strict';

/* global angular, moment, $ */

var app = angular.module('angularApp');

app.directive('widgetCalendar', function($timeout,$modal, TextTransmission, $compile, $http, $rootScope) {

  return {
    templateUrl: '/views/widgets/calendar/widget.calendar.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    link: function($scope) {

      TextTransmission.fetchTextForWall(function(data) {
        console.log('Data in fetchTextForWall: ', data);
        if(data.data === 'addCalendarEntry'){
          try {
            $scope.addCalendarEntry();
          } catch (e) {

          }
        }
      },$scope.socket);

      $scope.putDataInConsole = function () {
        console.log($scope.data);
      };


      $scope.addCalendarEntry = function() {

        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.calendar.html',
          controller: 'ModalCalendarCtrl'
        });

        WidgetModal.result.then(function(data){
          //TODO: Make new calender entry.
        
          data.startTime.setHours(data.startHours.getHours());
          data.startTime.setMinutes(data.startHours.getMinutes());
          data.startTime.setDate(data.startTime.getDate()+1);

          data.endTime.setHours(data.endHours.getHours());
          data.endTime.setMinutes(data.endHours.getMinutes());
          data.endTime.setDate(data.endTime.getDate()+1);

          $scope.data.push({name: data.name, description: data.description, location: data.location, persons: data.persons, startTime: data.startTime, endTime: data.endTime});

        });
      };

      TextTransmission.fetchDataForWall(function(data) {
        $scope.data = data.data.entries;
      }, $scope.socket);

      var fetchCalendar = function(id) {
        $http.get('/calendar/' + $rootScope.uid + (id ? '?id=' + id : ''));
      };

      var putCalendar = function(data) {
        $http.put('/calendar/' + $rootScope.uid, data);
      };

      var deleteCalendar = function(id) {
        $http.delete('/calendar/' + $rootScope.uid + (id ? '/' + id : ''));
      };

      // initially fetch calendar
      fetchCalendar();


      
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
          if (el.position().top < 240){
            return 'bottom';
          } else {
            return 'top';
          }
        };
        // Replaces the priority with adequate colored circle
        var priorityFilter = function(text) {
          switch (text) {
          case 'red':
            return '<div style="width: .8em; height: .8em; background-color: red; margin-top: .2em; margin-bottom: .5em; border-radius: .4em; -webkit-border-radius: .4em; -moz-border-radius: .4em;"> </div>';
          case 'orange':
            return '<div style="width: .8em; height: .8em; background-color: orange; margin-top: .2em; margin-bottom: .5em; border-radius: .4em; -webkit-border-radius: .4em; -moz-border-radius: .4em;"> </div>';
          case 'green':
            return '<div style="width: .8em; height: .8em; background-color: green; margin-top: .2em; margin-bottom: .5em; border-radius: .4em; -webkit-border-radius: .4em; -moz-border-radius: .4em;"> </div>';
          }
        };

        if ($scope.lastShownCalEntry !== null && !$target.is($scope.lastShownCalEntry)) {
          console.log('I am in if case and have to hide the popover of: ', $scope.lastShownCalEntry);
          $scope.lastShownCalEntry.popover('destroy');
        }

        var content = '<div class="col-md-12 row"><div class="popovertext"><div class="col-md-4">Description:</div><div class="col-md-8">' + data.description + '</div><div class="col-md-4">Location:</div><div class="col-md-8">' + data.location + '</div><div class="col-md-4">Start:</div><div class="col-md-8">' + moment(data.startTime).format('D.M H:mm') + '</div><div class="col-md-4">End:</div><div class="col-md-8">' + moment(data.endTime).format('D.M H:mm') + '</div><div class="col-md-4">Persons:</div><div class="col-md-8">' + data.persons + '</div><div class="col-md-12"><button id="{{data.id}}" class="btn btn-primary full-width popovertext {{css}}" ng-click="$parent.removeCalendarEntry(data)">Remove</button></div></div></div>';
        $target.popover({
          placement : 'auto bottom',    // previously placement($target)
          title : data.name, //this is the top title bar of the popover. add some basic css
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
        $scope.lastShownCalEntry.popover('destroy');
        $scope.data.forEach(function (element,index,array) {
          console.log('Current element: ', element);
          if( JSON.stringify(element) === JSON.stringify(data)){
            console.log('I can now remove. Element: ', element);
            $scope.data.splice(index, 1);
            deleteCalendar(element.id);
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