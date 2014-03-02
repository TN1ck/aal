'use strict';

/* global angular, moment, d3 */

var app = angular.module('angularApp');

app.factory('WidgetData', function(Persistence, $FB, $q, $rootScope, SocialComparison, TextTransmission) {

  var checkIfPostHasBeenLiked = function(myFacebookId, post) {
    if (post.likes === undefined) {
      return false;
    }
    for (var i=0; i<post.likes.data.length; i++) {
      if (post.likes.data[i].id == myFacebookId) {
        return true;
      }
    }
    return false;
  };

  var iterateThroughPosts = function(myFacebookId, posts) {
    for (var i=0; i<posts.length; i++) {
      posts[i].alreadyLiked = checkIfPostHasBeenLiked(myFacebookId, posts[i]);
    }
    return posts;
  };

  var createMapFromPostToAlreadyLiked = function(posts) {
    var mappingOfLikedPosts = {};
    for (var i=0; i<posts.length; i++) {
      mappingOfLikedPosts[posts[i].id] = posts[i].alreadyLiked;
    }
    return mappingOfLikedPosts;
  };

  var social = $q.defer(),
      colors,
      widgets,
      compareTwoPersons = $q.defer();

  var updateApiCall = function (token) {

    console.log("updateApiCall called!")

    // console.log('BIN DRIN1111111111111111111 with token: ' ,token);

    $FB.api('/me/home' + (token ? '?access_token=' + token : '')).then(function(posts) {

      // console.log('BIN DRIN', posts);

      if (!posts.error) {
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
        console.log('We now resolve the promise again in WidgetData.', token);
        $rootScope.posts = posts;
        // social.resolve(posts);
        TextTransmission.deliverDataForWall(posts,'SOCIAL');
        // $rootScope.setSocialData(posts);
      } else {
        TextTransmission.deliverDataForWall($rootScope.posts,'SOCIAL');
      }

      $FB.getLoginStatus(function(response) {
        token = response.authResponse.accessToken;
        SocialComparison.setToken(token);
        compareTwoPersons.resolve(SocialComparison.compareTwoPersons);
      });
    });
  };

  var logoutFB = function (response) {
    // $FB.getLoginStatus( function (response) {
    console.log('LoginStatus before Logout:', response);
    // });
    // we are not logged in so we cant log out
    if (!response.session) {
      $rootScope.fbToken = undefined;
      console.log('NOW we are logged out!', response);
      // social.reject('test');
      return;
    }
    // we have to do this loop to make sure fb really destroys our session
    // $FB.getLoginStatus( function (response) {
    // console.log('LoginStatus after Logout:', response);
    // });
    $FB.logout(logoutFB);

  };

  var logoutFB2nd = function () {
    $FB.logout(function(response) {
      console.log('This is current $FB', $FB);
      $FB.Auth.setAuthResponse(null, 'unknown');
      console.log('2nd logout done', response);
    });

    $FB.getLoginStatus( function (response) {
      console.log('LoginStatus after 2ndLogout:', response);
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
      }
    });

  widgets = [
    {name: 'news', color: '#D65B3C', socket: 'NEWS'},
    {name: 'mail', color: '#D77F47', socket: 'MAIL'},
    {name: 'calendar', color: '#D9AA5A', socket: 'CALENDAR'},
    {name: 'personal', color: '#2980b9', socket: 'FACEBOOK'},
    {name: 'social', color: '#19806E', socket: 'SOCIAL'},
    {name: 'todo', color: '#AE8EA7', socket: 'TODO'},
    {name: 'debug', color: '#bdc3c7', socket: 'DEBUG'}

  ];

  colors = ['#D65B3C', '#D77F47', '#D9AA5A', '#2980b9', '#19806E', '#AE8EA7', '#bdc3c7'];

  return {
    logoutFB: logoutFB,
    logoutFB2nd: logoutFB2nd,
    updateApiCall: updateApiCall,
    social: social.promise,
    colors: colors,
    widgets: widgets,
    compareTwoPersons: compareTwoPersons.promise
  };
});