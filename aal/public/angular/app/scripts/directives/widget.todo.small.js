'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodoSmall', function() {

  return {
    templateUrl: '/views/widgets/todo/widget.todo.small.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '='
    }
  };
});