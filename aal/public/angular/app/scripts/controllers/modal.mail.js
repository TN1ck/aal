'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('ModalMailCtrl', function ($scope, $modalInstance, TextTransmission) {

  console.log('I am now in ModalMailCtrl');
  $scope.modal = {
    text: '',
    subject: '',
    receiver: ''
  };

  TextTransmission.fetchTextForWall(function(data) {
    console.log('Fetched data in modal.mail.js: ' ,data);
    if(data.data === 'ok') {
      try {
        $scope.ok();
      } catch (e) {

      }
    } else if (data.data === 'cancel') {
      try {
        $scope.cancel();
      } catch (e) {
        
      }
    } else {
      // data.data is an object
      $scope.modal = data.data;
    }
  });

  console.log('We want to send: wrapper.mobile.mail');
  // TextTransmission.code = TextTransmission.mobileId;
  // TextTransmission.deliverText('wrapper.mobile.mail');
  TextTransmission.deliverTextForInputDevice('wrapper.mobile.mail');

  $scope.ok = function () {
    console.log('ModalMailCtrl is in ok()');
    console.log($scope.modal);
    // our  promise is resolved and widet.mail adds it
    $modalInstance.close($scope.modal);
    TextTransmission.deliverTextForInputDevice('wrapper.mobile.navigation');

    // defered.resolve($scope.modal);

  };

  $scope.cancel = function () {
    console.log('ModalMailCtrl is in cancel()');
    console.log('ModalInstance: ' , $modalInstance);
    $modalInstance.dismiss('cancel');
    TextTransmission.deliverTextForInputDevice('wrapper.mobile.navigation');

    // defered.reject('Canceled');

  };
});