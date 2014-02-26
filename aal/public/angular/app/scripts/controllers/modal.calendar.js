'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('ModalCalendarCtrl',
  function ($scope, $modalInstance, TextTransmission) {

    $scope.modal = {
      name: '',
      description: '',
      location: '',
      startTime: new Date(),    //Type DATE?
      endTime: new Date(),      //Type DATE?
      persons: '',

      startHours: new Date(),
      endHours: new Date(),
    };

    // $scope.startTime = new Date();
    // $scope.endTime = new Date();

    TextTransmission.fetchTextForWall(function(data) {
      console.log('Data in fetchTextForWall: ', data);
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

    TextTransmission.deliverTextForInputDevice('wrapper.mobile.calendar');


    $scope.ok = function() {
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
