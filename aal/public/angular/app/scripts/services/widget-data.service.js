'use strict';

/* global angular, moment, d3 */

var app = angular.module('angularApp');

app.factory('WidgetData', function(Persistence, $FB, $q) {

  var calendar = $q.defer(),
      news = $q.defer(),
      social = $q.defer(),
      personal = $q.defer(),
      todo = $q.defer(),
      colors,
      widgets;

  var updateApiCall = function updateApiCall () {

    $FB.api('/me').then(function(data) {
      $FB.api('/me/picture?type=large').then(function(picture) {
        data.picture = picture.data;
        personal.resolve(data);
      });
    });

    $FB.api('/me/home').then(function(posts) {
      
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
      social.resolve(posts);

    });
  };

  $FB.getLoginStatus()
    .then(updateApiCall);

  Persistence
    .todo
    .get()
    .$promise
    .then(function(data) {
      todo.resolve(data);
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
      calendar.resolve(data.sort(function(a, b) {
        return a.startDate - b.startDate;
      }));
    });

  Persistence
    .news
    .get()
    .$promise
    .then(function(data) {
      news.resolve(data);
    });


  widgets = [
    {name: 'news', color: '#D65B3C'},
    {name: 'personal', color: '#D77F47'},
    {name: 'calendar', color: '#D9AA5A'},
    {name: 'social', color: '#70BE8A'},
    {name: 'todo', color: '#19806E'}
  ];

  colors = ['#D65B3C', '#D77F47', '#D9AA5A', '#70BE8A', '#19806E'];

  return {
    social: social.promise,
    news: news.promise,
    calendar: calendar.promise,
    todo: todo.promise,
    personal: personal.promise,
    colors: colors,
    widgets: widgets
  };
});