'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('MobileCtrl', ['$scope', 'TextTransmission','$state',
    function ($scope, TextTransmission, $state) {

      $scope.foo = '';
      $scope.textinput = '';

      // $scope.$watch('mobileIdText', function(newVal, oldVal) {
      //   TextTransmission.code = newVal;
      //   // TextTransmission.mobileId = newVal;
      //   TextTransmission.fetchTextForInputDevice(function(data) {
      //   if(data.data === 'wrapper.mobile.todo'){
      //     console.log('MobileCtrl received wrapper.mobile.todo');
      //     $state.transitionTo('wrapper.mobile.todo');
      //   } else if(data.data === 'wrapper.mobile.social'){
      //     console.log('MobileCtrl received wrapper.mobile.todo');
      //     $state.transitionTo('wrapper.mobile.social');
      //   } else {
      //     console.log('unknown state received. we received:' + data.data);
      //   }

      // });
        

      //   console.log("changed code to: "+newVal);
      // });

      $scope.$watch('textinput', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          TextTransmission.deliverTextForWall(newVal);
        }
      });

      $scope.setMobileId = function() {
        //set correct channel for listening
        TextTransmission.code = $scope.mobileIdText;
        //disable the input field for the mobileID
        document.getElementsByName('mobileIdInput')[0].disabled = 'true';
        //disable the button too
        document.getElementsByName('mobileIdButton')[0].disabled ='true';
        //listen on channel for changes of state
        TextTransmission.fetchTextForInputDevice(function(data) {
          if(data.data === 'wrapper.mobile.todo'){
            console.log('MobileCtrl received wrapper.mobile.todo');
            $state.transitionTo('wrapper.mobile.todo');
          } else if(data.data === 'wrapper.mobile.social'){
            console.log('MobileCtrl received wrapper.mobile.social');
            $state.transitionTo('wrapper.mobile.social');
          } else {
            console.log('unknown state received. we received:' + data.data);
          }
        })
      };

      // TextTransmission.fetchText(function(data) {
      //     console.log('got', data.data);
      //     $scope.textinput = data.data;
      //   });

      $scope.cancel = function () {
        TextTransmission.deliverTextForWall('cancel');
        
        // defered.reject('Canceled');

      };
      $scope.ok = function () {
        TextTransmission.deliverTextForWall('ok');
      };
      

      
      

    }
]);

