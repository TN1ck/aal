'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('Persistence', function($resource){

    var todo = $resource('/todo/:id', {},
    {
      get: {
        'GET': {isArray: true}
      }
    });

    var calendar = $resource('/calendar/:id', {}, {
      get: {
        'GET': {isArray: true}
      }
    });

    var news = $resource('/news', {}, {
      get: {
        'GET': {isArray: true}
      }
    });

    var social = $resource('/social', {}, {
      get: {
        'GET': {isArray: true}
      }
    });

    return {
      calendar: calendar,
      todo: todo,
      news: news,
      social: social
    };

  });
