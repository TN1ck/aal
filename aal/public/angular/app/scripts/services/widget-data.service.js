'use strict';

/* global angular, moment, d3 */

var app = angular.module('angularApp');

app.factory('WidgetData', function(Persistence, $FB, $q, $rootScope) {

  var social = $q.defer(),
      colors,
      widgets;

  var updateApiCall = function updateApiCall (token) {

    console.log('BIN DRIN1111111111111111111 with token: ' ,token);

    $FB.api('/me/home' + (token ? '?access_token=' + token : '')).then(function(posts) {

      console.log('BIN DRIN', posts);

      if (posts) {
        posts.picturePosts = [];
        
        var picturePosts = posts.data.filter(function(d) {
          return d.type === 'photo';
        });

        picturePosts = d3.shuffle(picturePosts);

        picturePosts.forEach(function(d) {
          d.picture = d.picture.replace('_s', '_n');
          posts.picturePosts.push(d);
        });

        var goodPosts = posts.data.filter(function(d) {
          return d.status_type === 'wall_post' || d.status_type === 'mobile_status_update';
        });

        goodPosts = d3.shuffle(goodPosts);
        posts.goodPosts = goodPosts;
        posts.goodPosts = posts.goodPosts.slice(0,11);
        social.resolve(posts);
      }

    });
  };

  // $FB.provide('', {
  //   'setAccessToken': function(a) {
  //     this._authResponse = { 'accessToken': a };
  //   }
  // });
// Usage

  $FB.getLoginStatus()
    .then(function(response) {
      if (response.status === 'connected') {
        updateApiCall();
      } else {
        console.log('Else case of getLoginStatus');
        $rootScope.fbToken.promise.then(function (token) {
            $FB._authResponse = { 'accessToken': token };
            console.log('FB._authResponse did well!');
            updateApiCall(token);
          });
      }
    });

  widgets = [
    {name: 'news', color: '#D65B3C', socket: 'NEWS'},
    {name: 'mail', color: '#AE8EA7', socket: 'MAIL'},
    {name: 'calendar', color: '#D9AA5A', socket: 'CALENDAR'},
    {name: 'personal', color: '#D77F47', socket: 'FACEBOOK'},
    {name: 'social', color: '#70BE8A', socket: 'SOCIAL'},
    {name: 'todo', color: '#19806E', socket: 'TODO'},
    {name: 'debug', color: '#D77F47', socket: 'DEBUG'}

  ];

  colors = ['#D65B3C', '#D77F47', '#D9AA5A', '#2980b9', '#19806E', '#AE8EA7', '#bdc3c7'];

  return {
    social: social.promise,
    colors: colors,
    widgets: widgets
  };
});