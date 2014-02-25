'use strict';

/* global angular, gapi, $ */

var app = angular.module('angularApp');

app.directive('widgetSocial', function($q, $modal, $FB, FacebookPost, TextTransmission, $compile) {

  return {
    templateUrl: '/views/widgets/social/widget.social.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '=',
      css: '=',
      socket: '='
    },

    link: function($scope) {

      // Seems to be useless...
      TextTransmission.fetchTextForWall(function(data) {
        console.log('Data in fetchTextForWall: ', data);
        if(data.data === 'addSocialPost'){
          try {
            $scope.addSocialPost();
          } catch (e) {

          }
        }
      },$scope.socket);

      $scope.likePost = function(id) {
        // console.log('like function called');
        $FB.api(id+'/likes', 'post', function(response) {
          $('#'+id).replaceWith('');
        });
      };

      // This function seems to be useless too
      // $scope.addSocialPost = function() {

      //   var WidgetModal = $modal.open({
      //     templateUrl: '/views/widgets/mobile/mobile.social.html',
      //     controller: 'ModalSocialCtrl'
      //   });

      //   WidgetModal.result.then(function(data){
      //     if (data.type === 'facebook') {
      //       var newPost = {message: data.message};
      //       newPost = angular.extend(newPost, FacebookPost.facebookPost);
      //       $FB.api('/me/feed', 'post', newPost, function(data) {
      //       });
      //     }
      //   });
      // };

      $scope.lastShownPost = null;

      $scope.showPost = function(evnt, data) {

        // console.log(evnt)
        // console.log(data)

        var $target = $(evnt.currentTarget);
        var placement = function (el) {
          console.log('el.top: ' + el.position().top + 'el.left: ' , el.position() , 'boundingRect.left: ' , $(el).getBoundingClientRect().left , ' window-width: ' + $(window).width());
          if (el.position().top < 240){
            if(el.position().left < 50) {
              return 'right';
            } else {
              return 'bottom';
            }
          } else {
            if (el.position().left > ($(window).width() - 200)) {
              return 'left';
            } else {
              return 'top';
            }
          }
        };
        // Replaces the priority with adequate colored circle
        var priorityFilter = function(text) {
          switch (text) {
          case 'red':
            return '<div style="width: .8em; height: .8em; background-color: red; margin-top: .2em; margin-bottom: .5em; border-radius: .4em; -webkit-border-radius: .4em; -moz-border-radius: .4em;"> </div>';
          case 'orange':
            return '<div style="width: .8em; height: .8em; background-color: orange; margin-top: .2em; margin-bottom: .5em; border-radius: .4em; -webkit-border-radius: .4em; -moz-border-radius: .4em;"> </div>';
          case 'green':
            return '<div style="width: .8em; height: .8em; background-color: green; margin-top: .2em; margin-bottom: .5em; border-radius: .4em; -webkit-border-radius: .4em; -moz-border-radius: .4em;"> </div>';
          }
        };

        if ($scope.lastShownPost !== null && !$target.is($scope.lastShownPost)) {
          console.log('I am in if case and have to hide the popover of: ', $scope.lastShownPost);
          $scope.lastShownPost.popover('hide');
        }

        var likeSnippet = '<ng-pluralize count="data.likes.data.length" when="{\'0\': \'No one likes this\', \'one\': \'One person likes this\', \'other\': \'{} people like this\'}"></ng-pluralize>';
        try {
          typeof data.likes.data.length;
        } catch (err) {
          likeSnippet = 'No one likes this';
        }
        var commentSnippet = '<ng-pluralize count="data.comments.data.length" when="{\'0\': \'No comments so far\', \'one\': \'One comment\', \'other\': \'{} comments\'}"></ng-pluralize>';
        try {
          typeof data.comments.data.length;
        } catch (err) {
          commentSnippet = 'No comments so far';
        }
        var maxPostsShown = 4;
        var arrayOfNumbers;
        try {
          arrayOfNumbers = "["+Array.apply(null, {length: Math.min(data.comments.data.length, maxPostsShown)}).map(Number.call, Number).toString()+"]";
        } catch (err) {
          arrayOfNumbers = "[]";
        }
        var individualCommentSnippet = '<div class="col-md-12 well well-sm" style="margin-bottom: 0.3em;"><strong>{{data.comments.data[comment].from.name}}</strong><br>{{data.comments.data[comment].message}}</div>';
        var content = '<div class="col-md-12 row"><div class="popovertext"><div class="col-md-12"><b class="number-of-likes" style="float: left;">'+likeSnippet+'</b><b class="num-of-comments pull-right">'+commentSnippet+'</b></div><div class="col-md-12" style="overflow: hidden;" ng-repeat="comment in '+arrayOfNumbers+'">'+individualCommentSnippet+'</div></div></div>';
        var message = "";
        try {
          if (typeof data.message !== 'undefined') {
            message = " — " + data.message;
          }
        } catch (err) {}
        $target.popover({
          placement : 'auto bottom',    // previously placement($target)          title : 'Post', //this is the top title bar of the popover. add some basic css
          html: 'true', // needed to show html of course
          title: data.from.name + message,
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