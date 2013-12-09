var app = angular.module('angularApp');

app.directive('widget', function() {
    
    return {
        templateUrl: '/views/templates/widget.html',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '=',
          },
        link: function (scope, element) {
            scope.fullscreen = ['enter fullscreen', 'exit fullscreen'];
            scope.toggleFullscreen = function () {
                $(element).parent().parent().toggleClass('fullscreen');
                scope.fullscreen.reverse();
            };
        }
        };
  });
