'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetSocial', function($q, $modal, $FB, FacebookPost) {

  return {
    templateUrl: '/views/widgets/social/widget.social.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    },
    link: function(scope) {

      scope.new = function() {

        var WidgetModal = $modal.open({
          templateUrl: '/views/widgets/mobile/mobile.social.html',
          controller: 'ModalSocialCtrl'
        });

        WidgetModal.result.then(function(data){
          if (data.type === 'facebook') {
            var newPost = {message: data.message};
            newPost = angular.extend(newPost, FacebookPost.facebookPost);
            $FB.api('/me/feed', 'post', newPost, function(data) {
              console.log(data);
            });
          }
        });
      };

      scope.hangout = function() {
        gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
      };
    }
  };
});