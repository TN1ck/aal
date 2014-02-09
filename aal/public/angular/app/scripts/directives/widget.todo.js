'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodo', function() {

  return {
    templateUrl: '/views/widgets/todo/widget.todo.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    },
    controller: function($scope, $modal) {

      $scope.addTodo = function () {
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.todo.html',
          controller: 'ModalTodoCtrl'
        });

        WidgetModal.result.then(function(data){
          console.log('Data in TodoWidget: ', data);
          $scope.data.push({text: data.text, type: data.type});
          console.log('Whole TodoData: ' , $scope.data);
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