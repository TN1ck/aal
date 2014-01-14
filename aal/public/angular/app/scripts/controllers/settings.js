'use strict';

/* global angular, moment */

var appControllers = angular.module('appControllers');

appControllers.controller('SettingsCtrl', ['$scope', '$http', 'TextTransmission', '$FB',
    function ($scope, $http, TextTransmission, $FB) {

      $scope.mobileId = TextTransmission.mobileId;

      $scope.buttons = [{disabled: false}, {disabled: false}];

      $scope.createTestData = function() {

        $scope.buttons[0].disabled = true;
        $http.get('/populateDatabase').then(function() {
            $scope.buttons[0].disabled = false;
          });
      };

      $scope.deleteAllData = function() {

        $scope.buttons[1].disabled = true;
        $http.delete('/populateDatabase').then(function() {
            $scope.buttons[1].disabled = false;
          });
      };
    }
]);

