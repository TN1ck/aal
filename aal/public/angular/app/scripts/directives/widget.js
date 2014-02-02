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
          color: '='
        },
        link: function(scope, element) {


          
          scope.$watch('type', function() {
            var widgetString = '<widget-' + scope.type + ' data="' + scope.data + '" color="' + scope.color + '" css="' + scope.css + '">' + '</widget-' + scope.type + '/>';
            element.html($compile(widgetString)(scope.$parent));
          });

          var windowHeight = $(window).height(),
              $outerDiv = $(element).parent(),
              $style = $('#row-mds').length === 0 ? $('<style id="row-mds" type="text/css">').appendTo('head') : $('#row-mds');

          // console.log(paddingVert, paddingHor, windowWidth, windowHeight, $outerDiv);

          var setHeights = function () {

            var css =
                ['@media (min-width: 1000px) { .row-md-8 { ', 'height: ', windowHeight,'px; } }',
                 '@media (min-width: 1000px) { .row-md-4 { ', 'height: ', windowHeight/2,'px; } }',
                 '@media (min-width: 1000px) { .row-md-2 { ', 'height: ', windowHeight/4, 'px; } }',
                 '@media (min-width: 1000px) { .row-md-1 { ', 'height: ', windowHeight/8, 'px; } }'].join('');

            $style.html(css);

          };

          setHeights();
        },
      };
  });
