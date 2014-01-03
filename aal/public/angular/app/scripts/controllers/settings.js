'use strict';

/* global angular, moment */

var appControllers = angular.module('appControllers');

appControllers.controller('SettingsCtrl', ['$scope', '$http',
    function ($scope) {
      $scope.createTestData = function() {
        $('#create-test-data-button').attr('disabled', 'disabled');
        $.ajax({url: "/populateDatabase"}).done(function() {
          // alert("Populated Database with test data");
        }).always(function() {
          $('#create-test-data-button').removeAttr('disabled');
        });
      };
      $scope.deleteAllData = function() {
        $('#delete-all-data-button').attr('disabled', 'disabled');
        $.ajax({url: "/populateDatabase", type: 'delete'}).done(function() {
          // alert("Deleted all data from database");
        }).always(function() {
          $('#delete-all-data-button').removeAttr('disabled');
        });
      };
    }
]);

