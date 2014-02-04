'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetSocial', function($q, $modal, $FB) {


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

        modalInstanceCtrl.promise.then(function(data){
          // scope.data.reverse().push(data);
          // scope.data.reverse();
        });
      };

      scope.hangout = function() {
        gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
      };
    }
  };
});