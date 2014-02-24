'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetMail', function(TextTransmission, $http, $modal, $rootScope) {

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

      $scope.data = $rootScope.mailData;

      TextTransmission.fetchTextForWall(function(data) {
        if(data.data === 'newMail'){
          try {
            $scope.newMail();
          } catch (e) {

          }
        }
      }, $scope.socket);

	    TextTransmission.fetchDataForWall(function(data) {
        // the length is a hack
        if (!$rootScope.mailData || $rootScope.mailData.length !== data.data.mails.length) {
          $rootScope.mailData = data.data.mails;
          $scope.data = data.data.mails;
        }
	    },$scope.socket);

      var fetchMail = function(id) {
        $http.get('/mail/' + $rootScope.currentUser.userID + (id ? '?id=' + id : ''));
      };

      var putMail = function(data) {
        $http.put('/mail/' + $rootScope.currentUser.userID, data);
      };

      var deleteMail = function(id) {
        $http.delete('/mail/' + $rootScope.currentUser.userID + (id ? '/' + id : ''));
      };

      // initially fetch the mails
      fetchMail();

      $scope.newMail = function() {

        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.mail.html',
          controller: 'ModalMailCtrl'
        });

        WidgetModal.result.then(function(data) {
          // TODO: Send MAIL
        });
      };

      $scope.displayMail = function (evnt, data) {
        var $target = $(evnt.currentTarget);

        console.log('Data in displayNews: ' , data);
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/modals/modal.mail.html',
          scope: $target.scope()
        });
      }
		}
  };
});