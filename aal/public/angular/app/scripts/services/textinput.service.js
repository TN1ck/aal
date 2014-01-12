'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('Textinput', function($modal) {

    var ModalInstanceCtrl = function ($scope, $modalInstance) {

      $scope.textinput = 'Wurst';

      $scope.$watch('textinput', function(newVal, oldVal) {
          console.log(newVal, oldVal);
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
