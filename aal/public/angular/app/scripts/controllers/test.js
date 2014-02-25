'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('TestCtrl', ['$scope', 'TextTransmission','$state','$rootScope','$location','$FB', '$http','$timeout',
  function ($scope, TextTransmission, $state, $rootScope, $location, $FB, $http, $timeout) {

    $scope.newKnownUser = function (uid) {
      TextTransmission.deliverDataForWall({niteID: 312, userID: -2},'ADD_USER');
      $timeout(function() {
        TextTransmission.deliverDataForWall({niteID: 312, userID: uid},'ADD_USER');
      }, 500);

    };
    $scope.newUnknownUser = function () {
      TextTransmission.deliverDataForWall({niteID: 312, userID: -2}, 'ADD_USER');
      $timeout(function() {
        TextTransmission.deliverDataForWall({niteID: 312, userID: -1},'ADD_USER');
      }, 500);
    };

    $scope.removeKnownUser = function (uid) {
      TextTransmission.deliverDataForWall({niteID: 312, userID: uid}, 'REMOVE_USER');
    };
    $scope.removeUnknownUser = function () {
      TextTransmission.deliverDataForWall({niteID: 312, userID: -1}, 'REMOVE_USER');
    };

  }
]);

