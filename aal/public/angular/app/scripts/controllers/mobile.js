'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('MobileCtrl', ['$scope', 'TextTransmission',
    function ($scope, TextTransmission) {

      $scope.foo = '';
      $scope.textinput = '';

      $scope.$watch('mobileIdText', function(newVal, oldVal) {
        TextTransmission.code = newVal;
        console.log("changed code to: "+newVal);
      });

      $scope.$watch('textinput', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          TextTransmission.deliverText(newVal);
        }
      });

      // TextTransmission.fetchText(function(data) {
      //     console.log('got', data.data);
      //     $scope.textinput = data.data;
      //   });

    }
]);

