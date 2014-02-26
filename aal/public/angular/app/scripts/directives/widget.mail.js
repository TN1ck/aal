'use strict';

/* global angular, moment */

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
        if (!$rootScope.currentUser) {
          $http.get('/mail/' + 1337 + (id ? '?id=' + id : ''));
        } else {
          $http.get('/mail/' + $rootScope.currentUser.userID + (id ? '?id=' + id : ''));
        }
      };

      var putMail = function(data) {
        if (!$rootScope.currentUser.userID) {
          $http.put('/mail/' + 1337, data);
        } else {
          $http.put('/mail/' + $rootScope.currentUser.userID, data);
        }
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
          putMail(data);
        });
      };

      $scope.displayMail = function (evnt, data) {
        var $target = $(evnt.currentTarget);

        console.log('Data in displayNews: ' , data);
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/modals/modal.mail.html',
          scope: $target.scope()
        });
      };

      moment.lang('de');
      $scope.moment = moment;

		}
  };
});