'use strict';

/* global angular, $, window */

var app = angular.module('angularApp');

app.directive('widget',  function(Navigation) {
    
    return {
        templateUrl: '/views/templates/widget.html',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '=',
          },
        link: function (scope, element) {

            // we assume 16/9 screens and two rows
            var windowSize = $(window).width(),
                screenHeight = (windowSize * 9/16);

            var setHeights = function () {
              if ($(element).parent().parent().hasClass('half-height')) {
                $(element).parent().parent().css('height', (screenHeight/2) + 'px');
              } else {
                $(element).parent().parent().css('height', screenHeight + 'px');
              }
            };

            setHeights();

            scope.fullscreen = ['enter fullscreen', 'exit fullscreen'];
            scope.counter = Navigation.getCounter(element);
            scope.toggleFullscreen = function () {
                $(element).parent().parent().toggleClass('fullscreen');
                scope.fullscreen.reverse();

                if($(element).parent().parent().hasClass('fullscreen')){
                  $(element).parent().parent().removeClass('border');
                  $(element).parent().parent().removeClass('noborder');
                  $(element).parent().parent().css('height', '100%');
                } else {
                  setHeights();
                  $(element).parent().parent().addClass('border');

                }
              };
            scope.$watch(Navigation.getCurrentSelected , function (newValue, oldValue, scope){
                if(newValue === scope.counter){
                  $(element).parent().parent().removeClass('noborder');
                  $(element).parent().parent().addClass('border');
                }
                if(oldValue === scope.counter && newValue !== oldValue){
                  $(element).parent().parent().removeClass('border');
                  $(element).parent().parent().addClass('noborder');
                }
              });
            scope.$watch(Navigation.getFullscreenOn , function(newValue, oldValue, scope){
                if(newValue === 1 && oldValue === 0 && Navigation.getCurrentSelected() === scope.counter){
                  scope.toggleFullscreen();
                }
                if(newValue === 0 && oldValue === 1 && Navigation.getCurrentSelected() === scope.counter){
                  scope.toggleFullscreen();
                }
              });
          },
        };
  });
