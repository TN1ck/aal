'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('colorUtils', function () {

  return {

    hexToRgb: function (hexColor) {
      
      var r = parseInt(hexColor.substr(1, 2), 16),
          g = parseInt(hexColor.substr(3, 2), 16),
          b = parseInt(hexColor.substr(5, 2), 16);

      return [r, g, b];

    },

    blend: function (hex1, hex2, factor) {

      var rgb1 = this.hexToRgb(hex1),
          rgb2 = this.hexToRgb(hex2);

      var blended = [
        Math.round(factor * rgb1[0] + (1.0 - factor) * rgb2[0]),
        Math.round(factor * rgb1[1] + (1.0 - factor) * rgb2[1]),
        Math.round(factor * rgb1[2] + (1.0 - factor) * rgb2[2])
      ];

      return this.rgbToHex(blended);
    

    },

    rgbToHex: function (rgb) {
      
      var prependZeroIfNecessary =  function (hex ) {
        return hex.length === 1 ? '0' + hex : hex;
      };
      
      var r = Number(rgb[0]),
          g = Number(rgb[1]),
          b = Number(rgb[2]);

      if (isNaN(r) || r < 0 || r > 255 ||
          isNaN(g) || g < 0 || g > 255 ||
          isNaN(b) || b < 0 || b > 255) {
        throw new Error('"(' + r + ',' + g + ',' + b + '") is not a valid RGB color');
      }

      var hexR = prependZeroIfNecessary(r.toString(16)),
          hexG = prependZeroIfNecessary(g.toString(16)),
          hexB = prependZeroIfNecessary(b.toString(16));

      return '#' + hexR + hexG + hexB;
    
    }

  };

});