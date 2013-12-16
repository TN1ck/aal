'use strict';

/* global angular, $, window */

var app = angular.module('angularApp');

app.directive('widget', function(Navigation) {
    
    return {
        templateUrl: '/views/templates/widget.html',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '=',
          },
        link: function(scope, element) {

            // we assume 16/9 screens and two rows
            var windowSize = $(window).width(),
                screenHeight = (windowSize * 9/16),
                outerDiv = $(element).parent().parent();

            var setHeights = function () {
              
              if (windowSize > 1200) {
                if (outerDiv.hasClass('half-height')) {
                  outerDiv.css('height', (screenHeight/2) + 'px');
                } else {
                  outerDiv.css('height', screenHeight + 'px');
                }
              }

            };

            setHeights();

            scope.fullscreen = ['enter fullscreen', 'exit fullscreen'];
            scope.counter = Navigation.getCounter(element);
            scope.toggleFullscreen = function () {
                
                outerDiv.toggleClass('fullscreen')
                        .toggleClass('overflow');
                
                $('body').toggleClass('big-padding');
                
                scope.fullscreen.reverse();

                if (outerDiv.hasClass('fullscreen')) {
                  outerDiv.removeClass('border')
                          .removeClass('noborder')
                          .removeClass('animate-border')
                          .css('height', '100%');
                } else {
                  
                  setHeights();
                  outerDiv.addClass('border');

                }
              };
            scope.$watch(Navigation.getCurrentSelected , function(newValue, oldValue, scope) {
                
                if (newValue === scope.counter) {
                  
                  outerDiv.removeClass('noborder')
                          .addClass('border')
                          .addClass('animate-border');
                }

                if (oldValue === scope.counter && newValue !== oldValue) {
                  
                  $('div').removeClass('noborder');
                  outerDiv.removeClass('border')
                          .addClass('noborder')
                          .addClass('animate-border');
                }

              });
            scope.$watch(Navigation.getFullscreenOn , function(newValue, oldValue, scope) {
                
                if (newValue === 1 && oldValue === 0 &&
                   Navigation.getCurrentSelected() === scope.counter) {
                  
                  scope.toggleFullscreen();
                
                }

                if (newValue === 0 && oldValue === 1 &&
                   Navigation.getCurrentSelected() === scope.counter) {
                  
                  scope.toggleFullscreen();
                
                }
              });
          },
        };
  });
