'use strict';

/* global angular, moment, d3 */

var app = angular.module('angularApp');

app.factory('WidgetData', function(Persistence, $FB, $q) {

  var checkIfPostHasBeenLiked = function(myFacebookId, post) {
    // console.log("In check function")
    if (post.likes === undefined) {
      return false;
    }
    // console.log("My facebook id: " + myFacebookId)
    // debugger
    for (var i=0; i<post.likes.data.length; i++) {
      // console.log("Post's id: " + post.likes.data[i].id)
      if (post.likes.data[i].id == myFacebookId) {
        // console.log('matched!')
        return true;
      }
    }
    return false;
  }

  var iterateThroughPosts = function(myFacebookId, posts) {
    // console.log("In iterate function")
    for (var i=0; i<posts.length; i++) {
      posts[i].alreadyLiked = checkIfPostHasBeenLiked(myFacebookId, posts[i]);
      // console.log(checkIfPostHasBeenLiked(myFacebookId, posts[i]));
    }
    return posts;
  }

  var createMapFromPostToAlreadyLiked = function(posts) {
    var mappingOfLikedPosts = {};
    for (var i=0; i<posts.length; i++) {
      mappingOfLikedPosts[posts[i].id] = posts[i].alreadyLiked;
    }
    return mappingOfLikedPosts;
  }

  var social = $q.defer(),
      personal = $q.defer(),
      colors,
      widgets;

  var updateApiCall = function updateApiCall () {

    $FB.api('/me').then(function(data) {
      $FB.api('/me/picture?type=large').then(function(picture) {
        data.picture = picture.data;
        // save my id in order to determine if post is already liked
        personal.resolve(data);
      });

      $FB.api('/me/home').then(function(posts) {

        posts.myFacebookId = data.id;
        posts.data = iterateThroughPosts(posts.myFacebookId, posts.data);
        posts.mapping = createMapFromPostToAlreadyLiked(posts.data);

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

      });
    });
  };

  $FB.getLoginStatus()
    .then(updateApiCall);

  widgets = [
    {name: 'news', color: '#D65B3C', socket: 'NEWS'},
    {name: 'mail', color: '#AE8EA7', socket: 'MAIL'},
    {name: 'calendar', color: '#D9AA5A', socket: 'CALENDAR'},
    {name: 'personal', color: '#D77F47', socket: 'PERSONAL'},
    {name: 'social', color: '#70BE8A', socket: 'SOCIAL'},
    {name: 'todo', color: '#19806E', socket: 'TODO'},
    {name: 'debug', color: '#D77F47', socket: 'DEBUG'}

  ];

  colors = ['#D65B3C', '#D77F47', '#D9AA5A', '#2980b9', '#19806E', '#AE8EA7', '#bdc3c7'];

  return {
    social: social.promise,
    personal: personal.promise,
    colors: colors,
    widgets: widgets
  };
});