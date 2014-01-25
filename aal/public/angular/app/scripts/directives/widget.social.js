'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetSocial', function($q, $modal, $FB) {

  var modalInstanceCtrlFactory = function(){

    // create a new promise

    var defered = $q.defer();

    var modalInstanceCtrl = function ($scope, $modalInstance, TextTransmission, FacebookPost) {

      $scope.modal = {
        message: '',
        type: 'facebook'
        // from: {
        //   profilePicture: 'http://www3.math.tu-berlin.de/stoch/nf-stoch/TUB-logo.png'
        // }
      };

      TextTransmission.fetchText(function(data) {
        $scope.modal.message = data.data;
      });

      $scope.fbpost = FacebookPost.facebookPost;

      $scope.ok = function() {

        if ($scope.modal.type == 'facebook') {
          var newPost = {message: $scope.modal.message};

          newPost = angular.extend(newPost, $scope.fbpost);

          $FB.api('/me/feed', 'post', newPost, function(data) {
                console.log(data);
           });
        }

        $modalInstance.close();
        defered.resolve($scope.modal);

      };

      $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
        defered.reject('Canceled');

      };
    };

    return {
      controller: modalInstanceCtrl,
      promise: defered.promise
    };

  };

  return {
    templateUrl: '/views/templates/widget.social.html',
    restrict: 'E',
    scope: {
      data: '=',
    },
    link: function(scope) {

      scope.new = function() {
        var modalInstanceCtrl = modalInstanceCtrlFactory();

        $modal.open({
          templateUrl: '/views/modals/modal.social.html',
          controller: modalInstanceCtrl.controller
        });

        modalInstanceCtrl.promise.then(function(data){
          scope.social.reverse().push(data);
          scope.social.reverse();
        });
      };

      scope.hangout = function() {
        gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
      };
    }
  };
});