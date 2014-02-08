'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('cssService', function(colorUtils) {


  var createCss = function(colors) {
    
    var $style = $('#colors').length === 0 ? $('<style id="colors" type="text/css">').appendTo('head') : $('#colors');

    var css = colors.map(function(d, i) {

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
    
    $style.html(css);

    var cssClasses = colors.map(function(d, i) {return 'widget-color-' + i; });

    return cssClasses;

  };

  return {
    createCss: createCss
  };
});