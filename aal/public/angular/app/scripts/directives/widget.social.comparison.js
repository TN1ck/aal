'use strict';

/* global angular, gapi, $ */

var app = angular.module('angularApp');

app.directive('widgetSocialComparison', function($q, $modal, $FB, SocialComparison) {

  return {
    templateUrl: '/views/widgets/social/widget.social.comparison.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },

    link: function($scope) {}
  };
});