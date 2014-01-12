'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodo', function() {
    return {
        templateUrl: '/views/templates/widget.todo.html',
        restrict: 'E',
        scope: {
            todos: '='
          },
        controller: function($scope, Textinput) {
            $scope.addTodo = function () {
                Textinput.open();
                $scope.todos.push({text: 'oh well, i got pushed!', type: 'success'});
              };

            $scope.removeTodo = function (index) {
                $scope.todos.splice(index, 1);
              };

            $scope.changeTodo = function (index) {
                $scope.todos[index].text = 'TEXT GEÄNDERT!';
              };
          }
      };
  });