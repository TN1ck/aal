'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetPersonal', function(TextTransmission, $rootScope, $http, $FB) {
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
			}, $scope.socket);

      var fetchPersonal = function(token) {
        console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOS');
        $http.get('/user/' + $rootScope.uid + '/' + token);
      };

      var putPersonal = function(data) {
        $http.put('/user/' + $rootScope.uid, data);
      };

      var deletePersonal = function(id) {
        $http.put('/user/' + $rootScope.uid + (id ? '/' + id : ''));
      };

      $rootScope.fbToken.promise.then(fetchPersonal);
      /*$FB.getLoginStatus().then(function(response) {
        if(response.authResponse.accessToken) {
          fetchPersonal(response.authResponse.accessToken);
        }
      });*/

		}
  };
});