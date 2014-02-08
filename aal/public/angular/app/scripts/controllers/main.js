'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl',
  function ($scope, $q, $timeout, colorUtils, WidgetData, $rootScope, Navigation, TextTransmission, cssService) {

    $scope.colors = WidgetData.colors;
    $scope.css = cssService.createCss($scope.colors);

    /*
    Add the data to the scope, later we should do this directly in the directives
    */
    $rootScope.widgets = WidgetData.widgets.map(function(d, i) {
      WidgetData[d.name].then(function(data) {
        $scope[d.name] = data;
      });
      return {
        name: d.name,
        data: d.name,
        css: 'css[' + i + ']',
        color: 'colors[' + i + ']'
      };
    });


  });

