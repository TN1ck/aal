'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodo', function(TextTransmission, $compile, $http, $timeout) {

  return {
    templateUrl: '/views/widgets/todo/widget.todo.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    controller: function($scope, $modal) {

      $timeout(function() {
        $http.get('/todoitems');
      }, 2000);

      TextTransmission.fetchTextForWall( function(data) {
        console.log('Data in fetchTextForWall: ', data);
        if(data.data === 'addTodo'){
          try {
            $scope.addTodo();
          } catch (e) {

          }
        }
      },$scope.socket);


      TextTransmission.fetchDataForWall(function(data) {
        $scope.data = data;
      },$scope.socket);


      $scope.lastShownTodo = null;

      $scope.showTodo = function(evnt, data) {

        var $target = $(evnt.currentTarget);
        var placement = function (el) {
          if (el.position().top < 240){
            if(el.position().left < 50) {
              return 'right';
            } else {
              return 'bottom';
            }
          } else {
            if (el.position().left > ($(window).width() - 200)) {
              return 'left';
            } else {
              return 'top';
            }
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

        if ($scope.lastShownTodo !== null && !$target.is($scope.lastShownTodo)) {
          console.log('I am in if case and have to hide the popover of: ', $scope.lastShownTodo);
          $scope.lastShownTodo.popover('hide');
        }

        var content = '<div class="col-md-12 row"><div class="popovertext"><div class="col-md-3">Priority: </div><div class="col-md-9">' + priorityFilter(data.type) + '</div><div class="col-md-3">created: </div><div class="col-md-9">' + moment(data.created).format('D.M H:mm') + '</div><div class="col-md-12"><button id="{{data.id}}" class="btn btn-primary full-width popovertext {{css}}" ng-click="$parent.removeTodo(data)">Remove</button></div></div></div>';
        $target.popover({
          placement : 'auto bottom',    // previously placement($target)          title : data.text, //this is the top title bar of the popover. add some basic css
          html: 'true', // needed to show html of course
          content : function() {
                      return $compile($(content).html())($target.scope());
                    },
          container: 'body',
          trigger: 'manual'
        });
        $target.popover('toggle');
        $scope.lastShownTodo = $target;

      };


      $scope.removeTodo = function(data) {
        $scope.lastShownTodo.popover('hide');
        $scope.data.forEach(function (element,index,array) {
          console.log('Current element: ', element);
          if( JSON.stringify(element) === JSON.stringify(data)){
            console.log('I can now remove');
            $scope.data.splice(index, 1);
          }
        });
      };


      $scope.addTodo = function () {
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.todo.html',
          controller: 'ModalTodoCtrl'
        });

        WidgetModal.result.then(function(data){
          console.log('Data in TodoWidget: ', data);
          $scope.data.push({text: data.text, type: data.type});
          console.log('Whole TodoData: ' , $scope.data);
        });

      };


      $scope.changeTodo = function (index) {
        $scope.data[index].text = 'TEXT GEÄNDERT!';
      };
    }
  };
});