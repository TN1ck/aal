'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNewsBig', function() {

  return {
    templateUrl: '/views/widgets/news/widget.news.big.html',
    restrict: 'E',
    scope: {
      data: '=',
      color: '='
    },
    link: function(scope, element) {
      
      element.on('mouseenter', function() {
        $(this).children().addClass(scope.color + '-inverted');
      });

      element.on('mouseleave', function() {
        $(this).children().removeClass(scope.color + '-inverted');
      });

    }
  };
});