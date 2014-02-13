'use strict';

/* global angular, gapi */

var app = angular.module('angularApp');

app.directive('widgetSocial', function($q, $modal, $FB, FacebookPost, TextTransmission, $compile) {

  return {
    templateUrl: '/views/widgets/social/widget.social.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '='
    },
    link: function($scope) {

      TextTransmission.fetchTextForWall(function(data) {
        console.log('Data in fetchTextForWall: ', data);
        if(data.data === 'addSocialPost'){
          try {
            $scope.addSocialPost();
          } catch (e) {

          }
        }
      });



      $scope.addSocialPost = function() {

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

      $scope.lastShownPost = null;

      $scope.showPost = function(evnt, data) {

        var $target = $(evnt.currentTarget);
        var placement = function (el) {
          if (el.position().top < 240){
            return 'bottom';
          } else {
            return 'top';
          }
        };
        // Replaces the priority with adequate colored square
        var priorityFilter = function(text) {
          switch (text) {
          case 'red':
            return '<div style="width: .8em; height: .8em; background-color: red;margin-top: .2em; margin-bottom: .4em"> </div>';
          case 'orange':
            return '<div style="width: .8em; height: .8em; background-color: orange;margin-top: .2em; margin-bottom: .4em"> </div>';
          case 'green':
            return '<div style="width: .8em; height: .8em; background-color: green;margin-top: .2em; margin-bottom: .4em"> </div>';
          }
        };

        if ($scope.lastShownPost !== null && !$target.is($scope.lastShownPost)) {
          console.log('I am in if case and have to hide the popover of: ', $scope.lastShownPost);
          $scope.lastShownPost.popover('hide');
        }

        var content = '<div class="col-md-12 row"><div class="popovertext"><div class="col-md-12"><div class="row">{{data.from.name}}</div><div class="row col-md-12">{{data.from.message}}</div><div class="row col-md-3">Likes: {{data.likes.data.length}}</div><div class="row col-md-3">Comments: {{data.comments.data.length}}</div><div class="col-md-12" ng-repeat="comment in [0,1,2,3]"><div class="col-md-12">{{data.comments.data[comment].from.name}}<br>{{data.comments.data[comment].message}}</div></div><button id="{{data.id}}" class="btn btn-primary full-width popovertext {{css}}" ng-click="$parent.removePost(data)">Remove</button></div></div></div>';
        $target.popover({
          placement : placement($target),
          title : 'Post', //this is the top title bar of the popover. add some basic css
          html: 'true', // needed to show html of course
          content : function() {
                      return $compile($(content).html())($target.scope());
                    },
          container: 'body',
          trigger: 'manual'
        });
        $target.popover('toggle');
        $scope.lastShownPost = $target;

      };


      $scope.removePost = function(data) {
        $scope.lastShownPost.popover('hide');
        $scope.data.forEach(function (element,index,array) {
          console.log('Current element: ', element);
          if( JSON.stringify(element) === JSON.stringify(data)){
            console.log('I can now remove');
            $scope.data.splice(index, 1);
          }
        });
      };

      $scope.hangout = function() {
        gapi.hangout.render('placeholder-div', { 'render': 'createhangout' });
      };
    }
  };
});