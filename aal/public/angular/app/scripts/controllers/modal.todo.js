
// var appControllers = angular.module('appControllers');
// var test = function ($scope, $modalInstance, TextTransmission) {

//     $scope.modal = {
//       text: '',
//       type: 'green'
//     };

//     TextTransmission.fetchTextForWall(function(data) {
//       // data.data is an object
//       $scope.modal = data.data;
//     });

//     console.log('We want to send: wrapper.mobile.todo');
//     // TextTransmission.code = TextTransmission.mobileId;
//     // TextTransmission.deliverText('wrapper.mobile.todo');
//     TextTransmission.deliverTextForInputDevice('wrapper.mobile.todo');

//     $scope.ok = function () {
      
//       $modalInstance.close();
//       defered.resolve($scope.modal);

//     };

//     $scope.cancel = function () {
      
//       $modalInstance.dismiss('cancel');
//       defered.reject('Canceled');

//     };
// };
// window.ModalTodoCtrl= test;
// appControllers.controller('ModalTodoCtrl',
//   test
// );

'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('ModalTodoCtrl', 
  function ($scope, $modalInstance, TextTransmission) {

    console.log('I am now in ModalTodoCtrl');
    $scope.modal = {
      text: '',
      type: 'green'
    };

    TextTransmission.fetchTextForWall(function(data) {
      if(data.data === 'ok'){
          $scope.ok();
        } else if(data.data == 'cancel'){
          $scope.cancel();
        } else {
          // data.data is an object
          $scope.modal = data.data;
        }
    });

    console.log('We want to send: wrapper.mobile.todo');
    // TextTransmission.code = TextTransmission.mobileId;
    // TextTransmission.deliverText('wrapper.mobile.todo');
    TextTransmission.deliverTextForInputDevice('wrapper.mobile.todo');

    $scope.ok = function () {
      
      $modalInstance.close();
      // defered.resolve($scope.modal);

    };

    $scope.cancel = function () {
      
      $modalInstance.dismiss('cancel');
      // defered.reject('Canceled');

    };
}
);
