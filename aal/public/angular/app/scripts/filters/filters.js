'use strict';

/* global angular */

var app = angular.module('angularApp');

app.filter('truncate', function () {

  return function (text, length, end) {

    if (!text) {
      return;
    }
    if (isNaN(length)) {
      length = 10;
    }

    if (end === undefined) {
      end = '...';
    }

    if (text.length <= length || text.length - end.length <= length) {
      return text;
    }
    else {
      return String(text).substring(0, length-end.length) + end;
    }
  };

});

app.filter('reverse', function() {
  return function(items) {
    if (items) {
      return items.slice().reverse();
    }
  }
});