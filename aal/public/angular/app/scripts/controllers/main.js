'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', function ($scope, $q, $timeout, colorUtils, WidgetData) {

    var $style = $('#colors').length === 0 ? $('<style id="colors" type="text/css">').appendTo('head') : $('#colors');

    var css = WidgetData.colors.map(function(d, i) {
      var widgetColor = '.widget-color-'+ i + ' { border-color: rgba(255,255,255,1); background-color: ' + d  + '; color: white; }';
      var widgetColorInverted = '.widget-color-'+ i + ':hover { border-color: white; background-color: white; color: ' + d + '; }';
      var widgetSubColors = [0, 1, 2, 3, 4].map(function(n) {
        var color = colorUtils.blend(d, '#ffffff', 1 - n/9);
        return '.widget-color-' + i + '-' + n + '{ background-color: ' + color + '; }';
      });
      // color-specific selection?
      // var widgetSelected = ' .border .widget-color-' + i + ' { border-color: white; background-color: gray; color: white; } ';
      return widgetColor + ' ' + widgetColorInverted + widgetSubColors.join(' ');
    }).join(' ');

    $scope.css = [0, 1, 2, 3, 4].map(function(d) {return 'widget-color-' + d; });

    $style.html(css);

    /*
    Add the data to the scope, later we should do this directly in the directives
    */

    $scope.colors = WidgetData.colors;

    $scope.widgets = WidgetData.widgets.map(function(d, i) {
      WidgetData[d].then(function(data) {
        $scope[d] = data;
      });
      return {
        name: d,
        data: d,
        css: 'css[' + i + ']',
        color: 'colors[' + i + ']'
      };
    });


  });

