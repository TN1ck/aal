'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('MobileCtrl', ['$scope', 'TextTransmission',
    function ($scope, TextTransmission) {

      $scope.textinput = '';

      $scope.$watch('textinput', function(newVal, oldVal) {
          console.log('send', newVal);
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

