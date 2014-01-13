'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetSocial', function(Textinput) {
  return {
    templateUrl: '/views/templates/widget.social.html',
    restrict: 'E',
    scope: {
      social: '=',
    },
    link: function(scope) {

      scope.new = function() {
        Textinput.open();
      };

      scope.hangout = function() {
        gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
      };
    }
  };
});