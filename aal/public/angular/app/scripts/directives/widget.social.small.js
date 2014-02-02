'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetSocialSmall', function() {

  return {
    templateUrl: '/views/widgets/social/widget.social.small.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});