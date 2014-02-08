'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', function ($scope, $q, $timeout, colorUtils, WidgetData, $rootScope, Navigation, TextTransmission) {

    var $style = $('#colors').length === 0 ? $('<style id="colors" type="text/css">').appendTo('head') : $('#colors');

    var css = WidgetData.colors.map(function(d, i) {

      var rgb = colorUtils.hexToRgb(d);
      // transform to another color-space
      var yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000;

      var textColor = (yiq >= 200) ? '#4b4b57' : 'white';

      var widgetColor = '.widget-color-'+ i + ' { border-color: rgba(255,255,255,1); background-color: ' + d  + '; color: ' + textColor + '; }';
      var widgetColorInvertedHover = '.widget-color-'+ i + ':hover { border-color: white; background-color: ' + textColor + '; color: ' + d + '; }';
      var widgetColorInverted = '.widget-color-'+ i + '-inverted { border-color: white !important; background-color: ' + textColor + ' !important; color: ' + d + ' !important; } ';
      var widgetSubColors = [0, 1, 2, 3, 4].map(function(n) {
        var color = colorUtils.blend(d, '#ffffff', 1 - n/9);
        return '.widget-color-' + i + '-' + n + '{ background-color: ' + color + '; }';
      });
      // color-specific selection?
      // var widgetSelected = ' .border .widget-color-' + i + ' { border-color: white; background-color: gray; color: white; } ';
      return widgetColor + ' ' + widgetColorInvertedHover + ' ' + widgetColorInverted + widgetSubColors.join(' ');
    }).join(' ');

    $scope.css = [0, 1, 2, 3, 4].map(function(d) {return 'widget-color-' + d; });

    $style.html(css);

    /*
    Add the data to the scope, later we should do this directly in the directives
    */

    $scope.colors = WidgetData.colors;

    $scope.mobileId = TextTransmission.mobileId;

    // $rootScope is a hack
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

