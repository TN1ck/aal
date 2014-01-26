'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetTodo', function($q, $modal) {

    var modalInstanceCtrlFactory = function(){
      
      // create a new promise

      var defered = $q.defer();

      var modalInstanceCtrl = function ($scope, $modalInstance, TextTransmission) {

        $scope.modal = {
          text: '',
          type: 'green'
        };

        TextTransmission.fetchText(function(data) {
          $scope.modal.text = data.data;
        });

        $scope.ok = function () {
          
          $modalInstance.close();
          defered.resolve($scope.modal);

        };

        $scope.cancel = function () {
          
          $modalInstance.dismiss('cancel');
          defered.reject('Canceled');

        };
      };

      return {
        controller: modalInstanceCtrl,
        promise: defered.promise
      };

    };

    return {
        templateUrl: '/views/templates/widget.todo.html',
        restrict: 'E',
        scope: {
          data: '=',
          color: '='
        },
        controller: function($scope) {

            $scope.addTodo = function () {
                
                var modalInstanceCtrl = modalInstanceCtrlFactory();
                
                $modal.open({
                  templateUrl: '/views/modals/modal.todo.html',
                  controller: modalInstanceCtrl.controller
                });

                modalInstanceCtrl.promise.then(function(data){
                  $scope.todos.reverse().push(data);
                  $scope.todos.reverse();
                });

              };

            $scope.removeTodo = function (index) {
                $scope.todos.splice(index, 1);
              };

            $scope.changeTodo = function (index) {
                $scope.todos[index].text = 'TEXT GEÄNDERT!';
              };
          }
      };
  });