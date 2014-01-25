'use strict';

/* global angular, $, window */

var app = angular.module('angularApp');

app.directive('widget', function(Navigation, $compile) {

    return {
        template: '<div></div>',
        restrict: 'E',
        scope: {
          type: '=',
          data: '='
        },
        link: function(scope, element, $modal) {

            element.html($compile('<widget-' + scope.type + ' data="' + scope.data + '">' + '</widget-' + scope.type + '/>')(scope.$parent));
            
            scope.$watch('type', function() {
              element.html($compile('<widget-' + scope.type + ' data="' + scope.data + '">' + '</widget-' + scope.type + '/>')(scope.$parent));
            });

            // TODO remove the magic 8 and 6
            var paddingVert = Number($('.widget-padding').css('padding-left').replace('px', '')) * 8,
                paddingHor = Number($('.widget-padding').css('padding-top').replace('px', '')) * 10,
                windowWidth = $(window).width() - paddingVert,
                windowHeight = $(window).height() - paddingHor,
                $outerDiv = $(element).parent(),
                $outerOuterDiv = $outerDiv.parent(),
                $style = $('#row-mds').length === 0 ? $('<style id="row-mds" type="text/css">').appendTo('head') : $('#row-mds');

            // console.log(paddingVert, paddingHor, windowWidth, windowHeight, $outerDiv);

            var setHeights = function () {

              var css =
                  ['.row-md-8 { ', 'height: ', windowHeight,'px; }',
                   '.row-md-4 { ', 'height: ', windowHeight/2,'px; }',
                   '.row-md-2 { ', 'height: ', windowHeight/4, 'px; }',
                   '.row-md-1 { ', 'height: ', windowHeight/8, 'px; }'].join('');

              $style.html(css);

            };

            setHeights();

            scope.fullscreen = ['enter fullscreen', 'exit fullscreen'];
            scope.counter = Navigation.getCounter(element);
            scope.toggleFullscreen = function () {

                $outerOuterDiv.toggleClass('fullscreen')
                  .toggleClass('overflow');

                $('body').toggleClass('big-padding');

                scope.fullscreen.reverse();

                if ($outerOuterDiv.hasClass('fullscreen')) {
                  $outerDiv.removeClass('border')
                    .removeClass('noborder')
                    .removeClass('animate-border');

                  $outerDiv.css('height', '100%');
                } else {

                  // setHeights();
                  $outerDiv.addClass('border');

                }

                $(window).trigger('resize');
              };
            scope.$watch(Navigation.getCurrentSelected , function(newValue, oldValue, scope) {

                if (newValue === scope.counter) {

                  $outerDiv.removeClass('noborder')
                    .addClass('border')
                    .addClass('animate-border');
                }

                if (oldValue === scope.counter && newValue !== oldValue) {

                  $('div').removeClass('noborder');
                  $outerDiv.removeClass('border')
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
