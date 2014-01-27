'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', function ($scope, Persistence, $FB, $q, FacebookPost, $timeout) {

    // $timeout(function() {
    //   $scope.typeTest = 'todo';
    // }, 2000);

    // $FB.Event.subscribe('auth.statusChange', function (statusRes) {
    //   $scope.loginStatus = statusRes;

    //   updateMe();
    //   updateApiCall();
    // });

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

    var updateMe = function updateMe () {
      $FB.getLoginStatus()
      .then(function () {
        return $FB.api('/me');
      })
      .then(function (me) {
        $scope.me = me;
      });
    };

    var updateLoginStatus = function updateLoginStatus () {
      return $FB.getLoginStatus()
        .then(function (res) {
          $scope.loginStatus = res;
        });
    };

    var updateApiCall = function updateApiCall () {

      $FB.api('/me').then(function(data) {
        $scope.user = data;
      }).then(function(){
        $FB.api('/me/picture?type=large').then(function(picture) {
          $scope.user.picture = picture.data;
        });
      });

      $FB.api('/me/home').then(function(posts) {
        $scope.mockup.social = posts.data;
        $scope.mockup.social.picturePosts = [];
        console.log(posts.data);
        
        var picturePosts = posts.data.filter(function(d) {
          return d.type === 'photo';
        });

        picturePosts = d3.shuffle(picturePosts);

        picturePosts.forEach(function(d) {
          d.picture = d.picture.replace('_s', '_n');
          $scope.mockup.social.picturePosts.push(d);
        });

        var goodPosts = posts.data.filter(function(d) {
          return d.status_type === 'wall_post' || d.status_type === 'mobile_status_update';
        });

        goodPosts = d3.shuffle(goodPosts);
        $scope.mockup.social.goodPosts = goodPosts;

      });
    };

    updateLoginStatus()
    .then(updateApiCall);

    updateMe();

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
        $scope.mockup.calendar = data.sort(function(a, b) {
          return a.startDate - b.startDate;
        });
      });

    Persistence
      .news
      .get()
      .$promise
      .then(function(data) {
        $scope.mockup.news = data;
      });

    $scope.colors = ['#99D6EA', '#7FCCE5', '#66C1E0', '#4CB7DB', '#33ADD6', '#33ADD6', '#19A3D1', '#0099cc'];
    $scope.colors = ['#CEEA8C', '#9DE572', '#60E059', '#41DB6C', '#2AD691', '#14D1C2', '#0099CC'].reverse();
    $scope.colors = ['#703030' , '#2F343B' , '#7E827A' , '#E3CDA4' , '#C77966'];
    $scope.colors = ['#E64661', '#FFA644', '#998A2F', '#2C594F', '#002D40'];
    $scope.colors = ['#002F32', '#42826C', '#A5C77F', '#FFC861', '#C84663'];
    $scope.colors = ['#D65B3C', '#D77F47', '#D9AA5A', '#076D8C', '#026480'];
    $scope.colors = ['#D65B3C', '#D77F47', '#D9AA5A', '#70BE8A', '#19806E'];

    var $style = $('#colors').length === 0 ? $('<style id="colors" type="text/css">').appendTo('head') : $('#colors');

    var css = $scope.colors.map(function(d, i) {
      return '.widget-color-'+ i + ' { border-color: rgba(255,255,255,1); background-color: ' + d  + '; color: white; }';
    }).join(' ');

    $scope.names = [0, 1, 2, 3, 4].map(function(d) {return 'widget-color-' + d; });

    $style.html(css);

    $scope.widgets = [
      {name: 'news', data: 'mockup.news', color: 'names[0]'},
      {name: 'personal', data: 'user', color: 'names[1]'},
      {name: 'calendar', data: 'mockup.calendar', color: 'names[2]'},
      {name: 'social', data: 'mockup.social', color: 'names[3]'},
      {name: 'todo', data: 'mockup.todos', color: 'names[4]'}
    ];

  });

