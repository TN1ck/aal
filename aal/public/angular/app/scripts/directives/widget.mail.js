'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetMail', function() {
  return {
    templateUrl: '/views/widgets/widget.mail.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});