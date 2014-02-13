'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl',
  function ($scope, $q, $timeout, colorUtils, WidgetData, $rootScope, RadialService, TextTransmission, cssService) {

    $scope.colors = WidgetData.colors;
    $scope.css = cssService.createCss($scope.colors);

    /*
    Add the data to the scope, later we should do this directly in the directives
    */
    // next line is important for displaying mobile id in personal widget
    $scope.mobileId = TextTransmission.mobileId;
    $rootScope.mobileId = TextTransmission.mobileId;
    $rootScope.widgets = WidgetData.widgets.map(function(d, i) {
      WidgetData[d.name].then(function(data) {
        $scope[d.name] = data;
      });
      return {
        name: d.name,
        data: d.name,
        css: $scope.css[i],
        color: $scope.colors[i]
      };
    });

    $rootScope.getCssForWidget = function (name) {
      var wdgt = $rootScope.widgets.filter(
        function(el) { 
          return el.name === name; 
        }
      )[0];
      console.log(wdgt.css);
      return wdgt.css;
    };

    var Menu = new RadialService.Menu({selector: '#right'});


  });

