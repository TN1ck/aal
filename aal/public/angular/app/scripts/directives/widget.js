'use strict';

/* global angular, $, window */

var app = angular.module('angularApp');

app.directive('widget', function($compile) {

    return {
        template: '<div></div>',
        restrict: 'E',
        scope: {
          type: '=',
          data: '=',
          css: '=',
          color: '=',
          socket: '='
        },
        link: function(scope, element) {

          scope.$watch('type', function() {
            var widgetString = '<widget-' + scope.type + ' data="' + scope.data + '" color="\'' + scope.color + '\'" css="\'' + scope.css + '\'" socket="\'' + scope.socket + '\'">' + '</widget-' + scope.type + '/>';
            element.html($compile(widgetString)(scope.$parent));
          });
        },
      };
  });
