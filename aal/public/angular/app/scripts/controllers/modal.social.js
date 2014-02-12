'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('ModalSocialCtrl',
  function ($scope, $modalInstance, TextTransmission, FacebookPost) {

    $scope.modal = {
      message: '',
      type: 'facebook'
      // from: {
      //   profilePicture: 'http://www3.math.tu-berlin.de/stoch/nf-stoch/TUB-logo.png'
      // }
    };

    TextTransmission.fetchTextForWall(function(data) {
      console.log('Data in fetchTextForWall: ' ,data);
      if(data.data === 'ok'){
        try {
          $scope.ok();
        } catch (e) {

        }
      } else if(data.data === 'cancel'){
        try {
          $scope.cancel();
        } catch (e) {

        }
      } else {
        $scope.modal = data.data;
      }
    });

    TextTransmission.deliverTextForInputDevice('wrapper.mobile.social');


    $scope.fbpost = FacebookPost.facebookPost;

    $scope.ok = function() {
      console.log('ModalSocialCtrl is in ok()');
      console.log($scope.modal);
      // our  promise is resolved and widet.todo adds it
      $modalInstance.close($scope.modal);
      TextTransmission.deliverTextForInputDevice('wrapper.mobile.navigation');
    };

    $scope.cancel = function () {
      console.log('ModalSocialCtrl is in cancel().');
      console.log('ModalInstance: ' , $modalInstance);
      $modalInstance.dismiss('cancel');
      TextTransmission.deliverTextForInputDevice('wrapper.mobile.navigation');
      // defered.reject('Canceled');

    };
  }
);
