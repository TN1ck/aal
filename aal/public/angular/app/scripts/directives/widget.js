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
            var pre = '<div class="widget-outer" style="background-color: ' + scope.color + ';"><div class="widget-inner">';
            var widgetString = pre + '<widget-' + scope.type + ' data="' + scope.data + '" color="\'' + scope.color + '\'" css="\'' + scope.css + '\'" socket="\'' + scope.socket + '\'">' + '</widget-' + scope.type + '/>' + '</div></div>';
            element.html($compile(widgetString)(scope.$parent));
          });
        },
      };
  });
