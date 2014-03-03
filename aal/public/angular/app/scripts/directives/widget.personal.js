'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetPersonal', function(TextTransmission, $rootScope, $http, $FB, $modal, WidgetData) {
  return {
    templateUrl: '/views/widgets/widget.personal.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },
    link: function($scope) {
			
      TextTransmission.fetchDataForWall(function(data) {
        console.log('Facebookdaten bekommen!', data);
        $scope.data = data.data;
        if (data.data.accessToken) {
          $rootScope.fbToken = data.data.accessToken;
          WidgetData.updateApiCall($rootScope.fbToken);
        }
			}, $scope.socket);

      /*var fetchPersonal = function(token) {
        if (token === '') {
          if (!$rootScope.currentUser) {
            $http.get('/user/' + 1337);
          } else {
            $http.get('/user/' + $rootScope.currentUser.userID);
          }
        } else {
          if (!$rootScope.currentUser) {
            $http.get('/user/' + 1337 + '/' + token);
          } else {
            $http.get('/user/' + $rootScope.currentUser.userID + '/' + token);
          }
        console.log('FBToken: ' + token);
        }
      };*/

      var putPersonal = function(data) {
        if (!$rootScope.currentUser) {
          $http.put('/user/' + 1337, data);
        } else {
          $http.put('/user/' + $rootScope.currentUser.userID, data);
        }
      };

      var deletePersonal = function(id) {
        $http.put('/user/' + $rootScope.currentUser.userID + (id ? '/' + id : ''));
      };

      $scope.data = WidgetData.fetchPersonal('');


      $scope.displayPersonal = function (evnt, data) {
        console.log('Modal should be displayed.');
        var $target = $(evnt.currentTarget);

        console.log('Data in displayPersonal: ' , data);
        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/modals/modal.qrcode.html',
          scope: $target.scope()
        });
      };

      $scope.qrSizeModal = $(window).height()/2;
      $scope.qrSizeWidget =  $(window).height()/5;
      /*$FB.getLoginStatus().then(function(response) {
        if(response.authResponse.accessToken) {
          fetchPersonal(response.authResponse.accessToken);
        }
      });*/

		}
  };
});