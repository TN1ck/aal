'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('MobileCtrl', ['$scope', 'TextTransmission','$state','$rootScope','$location','$FB', '$http',
    function ($scope, TextTransmission, $state, $rootScope, $location, $FB, $http) {

      // $scope.$watch('mobileIdText', function(newVal, oldVal) {
      //   TextTransmission.code = newVal;
      //   // TextTransmission.mobileId = newVal;
      //   TextTransmission.fetchTextForInputDevice(function(data) {
      //   if(data.data === 'wrapper.mobile.todo'){
      //     console.log('MobileCtrl received wrapper.mobile.todo');
      //     $state.transitionTo('wrapper.mobile.todo');
      //   } else if(data.data === 'wrapper.mobile.social'){
      //     console.log('MobileCtrl received wrapper.mobile.todo');
      //     $state.transitionTo('wrapper.mobile.social');
      //   } else {
      //     console.log('unknown state received. we received:' + data.data);
      //   }

      // });
        

      //   console.log("changed code to: "+newVal);
      // });

      console.log('Here are the routeParams: ', ($location.search()));

      $scope.setMobileId = function() {
        //set correct channel for listening
        TextTransmission.code = $scope.mobileIdText;
        //disable the input field for the mobileID
        document.getElementsByName('mobileIdInput')[0].disabled = 'true';
        //disable the button too
        document.getElementsByName('mobileIdButton')[0].disabled ='true';
        //listen on channel for changes of state
        TextTransmission.fetchTextForInputDevice(function(data) {
          if(data.data === 'wrapper.mobile.todo'){
            console.log('MobileCtrl received wrapper.mobile.todo');
            $state.transitionTo('wrapper.mobile.todo');
          } else if(data.data === 'wrapper.mobile.social'){
            console.log('MobileCtrl received wrapper.mobile.social');
            $state.transitionTo('wrapper.mobile.social');
          } else if(data.data === 'wrapper.mobile.calendar'){
            $state.transitionTo('wrapper.mobile.calendar');
          } else if(data.data === 'wrapper.mobile.navigation'){
            $state.transitionTo('wrapper.mobile.navigation');
          } else if(data.data === 'wrapper.mobile.mail') {
            $state.transitionTo('wrapper.mobile.mail');
          }
          else {
            console.log('unknown state received. we received:' + data.data);
          }
        });
      };

      if (($location.search()).mobileCode) {
        console.log('hello i am in mobileControl and should have got a mobile id ', ($location.search()).mobileCode);
        $scope.mobileIdText = ($location.search()).mobileCode;
        $scope.setMobileId();
      }
      // TextTransmission.fetchText(function(data) {
      //     console.log('got', data.data);
      //     $scope.textinput = data.data;
      //   });

      $scope.$watchCollection('modal', function () {
        console.log('model listener');
        TextTransmission.deliverTextForWall($scope.modal);
      });

      $scope.cancel = function () {
        TextTransmission.deliverTextForWall('cancel');
      };

      $scope.ok = function () {
        TextTransmission.deliverTextForWall('ok');
      };
      

      $scope.addTodo = function () {
        TextTransmission.deliverTextForWall('addTodo', $rootScope.getSocketForWidget('todo'));
      };

      $scope.newMail = function () {
        TextTransmission.deliverTextForWall('newMail', $rootScope.getSocketForWidget('mail'));
      };

      $scope.addCalendarEntry = function () {
        TextTransmission.deliverTextForWall('addCalendarEntry', $rootScope.getSocketForWidget('calendar'));
      };
      
      $scope.addSocialPost = function () {
        TextTransmission.deliverTextForWall('addSocialPost', $rootScope.getSocketForWidget('social'));
      };

      $scope.googleLogin = function () {
        $state.transitionTo('wrapper.mobile.googleLogin');
      };

      $scope.changeStateToNavigation = function () {
        $state.transitionTo('wrapper.mobile.navigation');
      };

      $scope.sendGoogleLogin = function(name, pw) {
        pw = btoa(pw);
        if (!$rootScope.currentUser.userID) {
          $http.get('/google/' + 1337 + '/' + name + '/' + pw);
        } else {
          $http.get('/google/' + $rootScope.currentUser.userID + '/' + name + '/' + pw);
        }
        $state.transitionTo('wrapper.mobile.navigation');
      };

      $scope.fbLogin = function () {
        $FB.login(null, {
          scope: 'email, user_likes, read_stream, publish_actions, publish_stream'
        }).then(function(response) {
          if (response.authResponse) {
            if (response.status === 'connected') {
              TextTransmission.deliverTextForWall(response.authResponse.accessToken, 'FBAUTH');
            }
          }
        });
      };

    }
]);

