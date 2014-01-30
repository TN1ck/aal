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
        TextTransmission.code = $scope.mobileIdText;
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

      
      

      
      

    }
]);

