'use strict';

/* global angular, $ */

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
            scope.fullscreen = ['enter fullscreen', 'exit fullscreen'];
            console.log('Trying to catch my counter!');
            console.log(element.context.title);
            scope.counter = Navigation.getCounter(element);
            console.log('Got a:' + scope.counter);
            scope.toggleFullscreen = function () {
                $(element).parent().parent().toggleClass('fullscreen');
                scope.fullscreen.reverse();
              };
            scope.$watch(Navigation.getCurrentSelected , function (newValue, oldValue, scope){
                    if(newValue === scope.counter){
                        //alert('Addborder');
                        $(element).parent().parent().removeClass('noborder');
                        $(element).parent().parent().addClass('border');
                    }
                    if(oldValue === scope.counter && newValue !== oldValue){
                        //alert('Removeborder');
                        $(element).parent().parent().removeClass('border');
                        $(element).parent().parent().addClass('noborder');
                    }
                });
          },
        };
});
