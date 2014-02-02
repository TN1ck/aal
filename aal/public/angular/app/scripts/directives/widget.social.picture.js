'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetSocialPicture', function() {

  return {
    templateUrl: '/views/widgets/social/widget.social.picture.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    }
  };
});