'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('Persistence', function($resource) {

    var todo = $resource('/todoitems/:id', {},
    {
      get: {
          method: 'GET',
          isArray: true
        }
      });

    var calendar = $resource('/calendaritems/:id', {}, {
      get: {
          method: 'GET',
          isArray: true
        }
      });

    var news = $resource('/newsitems', {}, {
      get: {
          method: 'GET',
          isArray: true
        }
      });

    var social = $resource('/socialitems', {}, {
      get: {
          method: 'GET',
          isArray: true
        }
      });

    return {
      calendar: calendar,
      todo: todo,
      news: news,
      social: social
    };

  });
