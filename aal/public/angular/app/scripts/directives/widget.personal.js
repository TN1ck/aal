'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetPersonal', function(TextTransmission, $rootScope, $http) {
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
        $http.get('/user/' + $rootScope.uid + '/' + token);
        console.log(token);
      };

      var putPersonal = function(data) {
        $http.put('/user/' + $rootScope.uid, data);
      };

      var deletePersonal = function(id) {
        $http.put('/user/' + $rootScope.uid + (id ? '/' + id : ''));
      };

      $FB.getLoginStatus().then(function(response) {
        if(response.authResponse.accessToken) {
          fetchPersonal(response.authResponse.accessToken);
        }
      });

		}
  };
});