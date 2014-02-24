'use strict';

/* global angular, moment, OAuth */

var appControllers = angular.module('appControllers');

appControllers.controller('SettingsCtrl', ['$scope', '$http', 'TextTransmission', '$FB', 'FacebookPost',
    function ($scope, $http, TextTransmission, $FB, FacebookPost) {

      // Finding out how Gmail works...
      $scope.providers = ['twitter', 'facebook', 'linkedin', 'instagram', 'foursquare', 'github', 'googlemail'];

      $scope.loginProvider = function (provider) {
        OAuth.popup(provider, function(error, result) {

          if (error) {
            throw error; // do something with error
          }

          console.log(result); // do something with result

        });
      };

      var updateLoginStatus = function updateLoginStatus () {
        return $FB.getLoginStatus()
          .then(function (res) {
            $scope.loginStatus = res;
          });
      };

      updateLoginStatus();

      $scope.login = function () {
        $FB.login(null, {
          scope: 'email, user_likes, read_stream, publish_actions, publish_stream, user_actions.music, friends_actions.music, user_actions.video, friends_actions.video, friends_actions.video, user_actions.books, friends_actions.books, user_checkins, friends_checkins, user_events, friends_events'
        });
      };

      $scope.logout = function () {
        $FB.logout();
      };

      $scope.fbpost = FacebookPost.facebookPost;

      $scope.share = function() {
        $FB.ui($scope.fbpost, null);
      };

      $scope.mobileId = TextTransmission.mobileId;

      $scope.buttons = [{disabled: false}, {disabled: false}, {disabled: false},{disabled: false}];

      $scope.createTestData = function() {

        $scope.buttons[0].disabled = true;
        $http.get('/populateDatabase').then(function() {
            $scope.buttons[0].disabled = false;
          });
      };

      $scope.deleteAllData = function() {

        $scope.buttons[1].disabled = true;
        $http.delete('/populateDatabase').then(function() {
            $scope.buttons[1].disabled = false;
          });
      };
      $scope.runJiac = function() {

        $scope.buttons[2].disabled = true;
        $http.get('/startjiac').then(function() {
            $scope.buttons[2].disabled = false;
          });
      };
      $scope.exitJiac = function() {

        $scope.buttons[3].disabled = true;
        $http.get('/stopjiac').then(function() {
            $scope.buttons[3].disabled = false;
          });
      };
    }
]);

