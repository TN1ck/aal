var app = angular.module('angularApp');

app.directive('widgetTitle', function() {
    return {
        templateUrl: '/views/templates/widget.title.html',
        transclude: true,
        restrict: 'E'
    };
});