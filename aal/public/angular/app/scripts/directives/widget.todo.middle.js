'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodoMiddle', function() {

  return {
    templateUrl: '/views/widgets/todo/widget.todo.middle.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});