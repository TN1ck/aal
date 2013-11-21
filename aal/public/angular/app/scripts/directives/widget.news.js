var app = angular.module('angularApp');

app.directive('widgetNews', function() {
    return {
        templateUrl: '/views/templates/widget.news.html',
        restrict: 'E',
        scope: {
        	news: "=",
        }
    };
});