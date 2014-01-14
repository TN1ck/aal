'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('Textinput', function($modal) {

    var ModalInstanceCtrl = function ($scope, $modalInstance, TextTransmission) {

      $scope.textinput = '';

      TextTransmission.fetchText(function(data) {
          console.log('fetch', data.data);
          $scope.textinput = data.data;
        });

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    var open = function() {
        $modal.open({
          templateUrl: 'views/partials/modal.textinput.html',
          controller: ModalInstanceCtrl
        });
      };

    return {
      open: open
    };

  });
