'use strict';

/* global angular, moment, OAuth */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', function ($scope, Persistence, $FB, $q, FacebookPost, $timeout) {

    updateMe();

    $scope.typeTest = 'personal';

    // $timeout(function() {
    //   $scope.typeTest = 'todo';
    // }, 2000);

    updateLoginStatus()
    .then(updateApiCall);

    $FB.Event.subscribe('auth.statusChange', function (statusRes) {
      $scope.loginStatus = statusRes;

      updateMe();
      updateApiCall();
    });

    $scope.login = function () {
      $FB.login(null, {
        scope: 'email, user_likes, read_stream, publish_actions, publish_stream'
      });
    };

    $scope.logout = function () {
      $FB.logout();
    };

    $scope.fbpost = FacebookPost.facebookPost;

    $scope.share = function() {
        $FB.ui($scope.fbpost, null);
    };

    function updateMe () {
      $FB.getLoginStatus()
      .then(function () {
        return $FB.api('/me');
      })
      .then(function (me) {
        $scope.me = me;
      });
    }

    function updateLoginStatus () {
      return $FB.getLoginStatus()
        .then(function (res) {
          $scope.loginStatus = res;
        });
    }

    function updateApiCall () {

      $FB.api('/me').then(function(data) {
        $scope.user = data;
      }).then(function(){
        $FB.api('/me/picture?type=large').then(function(picture) {
          $scope.user.picture = picture.data;
        });
      });

      $FB.api('/me/home').then(function(posts) {
        $scope.mockup.social = posts.data;
        console.log(posts.data);
        // $scope.mockup.social.forEach(function(post) {
        //   $FB.api('/' + post.from.id + '/picture?type=large').then(
        //     function(result) {
        //       post.from.profilePicture = result.data.url;
        //       post.type = 'facebook';
        //       if (!post.message) {
        //         post.message = post.story;
        //       }
        //     });
        // });
      });
    }

    $scope.user = {
      first_name: 'Ano',
      last_name: 'Nymous',
      picture: {
        url: 'http://designyoutrust.com/wp-content/uploads7/designfetishnophotofacebook1.jpg'
      },
      email: 'Anonymous@gmail.com'
    };

    // TODO: refactor and remove this
    $scope.mockup = {

    };

    Persistence
      .todo
      .get()
      .$promise
      .then(function(data) {
        $scope.mockup.todos = data;
      });

    Persistence
      .calendar
      .get()
      .$promise
      .then(function(data) {
        data = data.map(function(event) {
          event.weekday = moment(event.startDate).calendar().split(' ')[0];
          return event;
        });
        $scope.mockup.calendar = data;
      });

    Persistence
      .news
      .get()
      .$promise
      .then(function(data) {
        $scope.mockup.news = data;
      });

  });

