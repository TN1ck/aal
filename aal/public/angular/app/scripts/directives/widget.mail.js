'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetMail', function(TextTransmission, $http, $modal) {

  return {
    templateUrl: '/views/widgets/widget.mail.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    link: function($scope) {

      TextTransmission.fetchTextForWall(function(data) {
        console.log('Data in fetchTextForWall: ', data);
        if(data.data === 'newMail'){
          try {
            $scope.newMail();
          } catch (e) {

          }
        }
      },$scope.socket);


	    TextTransmission.fetchDataForWall(function(data) {
				$scope.data = data.data;
	    },$scope.socket);
      $http.get('/mailitems');

      $scope.newMail = function() {

        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.mail.html',
          controller: 'ModalMailCtrl'
        });

        WidgetModal.result.then(function(data){
          // TODO: Send MAIL
        });
      };
		}
  };
});