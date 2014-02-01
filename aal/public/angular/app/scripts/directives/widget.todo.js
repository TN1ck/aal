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

        TextTransmission.fetchTextForWall(function(data) {
          // data.data is an object
          $scope.modal = data.data;
        });

        console.log('We want to send: wrapper.mobile.todo');
        // TextTransmission.code = TextTransmission.mobileId;
        // TextTransmission.deliverText('wrapper.mobile.todo');
        TextTransmission.deliverTextForInputDevice('wrapper.mobile.todo');

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
        templateUrl: '/views/widgets/todo/widget.todo.html',
        restrict: 'E',
        scope: {
          data: '=',
          color: '='
        },
        controller: function($scope) {

            $scope.addTodo = function () {
                
                var modalInstanceCtrl = modalInstanceCtrlFactory();
                
                $modal.open({
                  templateUrl: '/views/widgets/todo/modal.todo.html',
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