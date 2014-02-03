'use strict';

/* global angular */

var app = angular.module('angularApp');
console.log('APP: ', app);
app.directive('widgetTodo', function($q, $modal) {

  return {
    templateUrl: '/views/widgets/todo/widget.todo.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    },
    controller: function($scope,$modal) {

      $scope.addTodo = function () {
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.todo.html',
          controller: 'ModalTodoCtrl'
        });

        WidgetModal.result.then(function(data){
          $scope.data.reverse().push(data);
          $scope.data.reverse();

        });

      };

      $scope.removeTodo = function (index) {
          $scope.data.splice(index, 1);
      };

      $scope.changeTodo = function (index) {
        $scope.data[index].text = 'TEXT GEÄNDERT!';
      };
    }
  };
});