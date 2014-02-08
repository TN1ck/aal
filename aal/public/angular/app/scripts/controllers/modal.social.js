'use strict';

/* global angular */

var appControllers = angular.module('appControllers');

appControllers.controller('ModalSocialCtrl', function ($scope, $modalInstance, TextTransmission, FacebookPost, $FB) {

      $scope.modal = {
        message: '',
        type: 'facebook'
        // from: {
        //   profilePicture: 'http://www3.math.tu-berlin.de/stoch/nf-stoch/TUB-logo.png'
        // }
      };

      TextTransmission.fetchTextForWall(function(data) {
        console.log('Data in fetchTextForWall: ' ,data)
        if(data.data === 'ok'){
          $scope.ok();
        } else if(data.data === 'cancel'){
          $scope.cancel();
        } else {
          $scope.modal.message = data.data;
        }
      });

      TextTransmission.deliverTextForInputDevice('wrapper.mobile.social');


      $scope.fbpost = FacebookPost.facebookPost;

      $scope.ok = function() {

        if ($scope.modal.type === 'facebook') {
          var newPost = {message: $scope.modal.message};

          newPost = angular.extend(newPost, $scope.fbpost);

          $FB.api('/me/feed', 'post', newPost, function(data) {
                console.log(data);
           });
        }

        console.log("ModalSocialCtrl is in ok()");
        $modalInstance.close();
        TextTransmission.deliverTextForInputDevice('wrapper.mobile');
        // defered.resolve($scope.modal);

      };

      $scope.cancel = function () {
        console.log("ModalSocialCtrl is in cancel()");
        console.log("ModalInstance: " , $modalInstance);
        $modalInstance.dismiss('cancel');
        TextTransmission.deliverTextForInputDevice('wrapper.mobile');
        // defered.reject('Canceled');

      };
    });
