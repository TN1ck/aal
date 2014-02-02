'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodoBig', function() {

  return {
    templateUrl: '/views/widgets/todo/widget.todo.big.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});