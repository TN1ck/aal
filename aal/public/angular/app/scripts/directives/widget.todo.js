var app = angular.module('angularApp');

app.directive('widgetTodo', function() {
    return {
        templateUrl: '/views/templates/widget.todo.html',
        restrict: 'E',
        scope: {
        	todos: "="
        }
    };
});