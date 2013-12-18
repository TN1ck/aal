'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetSocial', function($sce) {
    return {
        templateUrl: '/views/templates/widget.social.html',
        restrict: 'E',
        scope: {
            social: '=',
          },
          link: function(scope) {

            scope.hangout = function() {
                gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
              };
            scope.htmlForMax = $sce.trustAsHtml('<span style="float: left;" class="btn btn-primary btn-sm">Just for Max</span>');
          }
        };
  });