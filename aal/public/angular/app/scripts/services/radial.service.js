'use strict';

/* global angular, d3, $ */

var app = angular.module('angularApp');

app.factory('RadialService', function() {
  
  var drawMenu = function(dict) {

    var colors = ['#B9DC51', '#D4E995', '#73CCED', '#FF7F7F', '#FFBB33', '#FFD580'];

    // This data won't change
    var selector = dict.selector,
        $svg = $(selector),
        svg = d3.select(selector),
        $width = $svg.width(),
        $height = $svg.height(),
        margins = {left: 50, right: 50, top: 50, bottom: 50},
        data = dict.data,
        transitionTime = 1500;

    svg = svg.append('g').attr('transform', 'rotate(180,' + ($width/2) + ',' + ($height/2) + ')');

    var oldRects = {};

    var drawRects = function(data, level) {

      var rects = svg.selectAll('.rects-new').data(data);
      oldRects['.rects-' + level] = rects;

      
      var x = d3.scale.linear()
        .domain([0, data.length])
        .rangeRound([margins.left, $width - margins.right]);

      var elHeight = ($height - (margins.top + margins.bottom))/level;

      rects.enter()
        .append('rect')
        .attr('class', 'svg-menu rects-' + level)
        .attr('x', function(d, i) {
          return x(i);
        })
        .attr('y', elHeight * level + margins.top)
        .attr('width', x(1) - x(0))
        .attr('height', 0)
        .style('fill', function(d,i) {
          return colors[i + level];
        })
        .on('click', function(d) {
          drawRects(d.data, level + 1);
        });

      // rects.transition()
      //   .duration(transitionTime)
      //   .attr('y', y(level - 1))
      //   .attr('height', $height/level);

      for (var i = 1; i <= level; i++) {
        var or = oldRects['.rects-' + i];
        or.transition()
          .duration(transitionTime)
          .attr('height', elHeight)
          .attr('y', elHeight * (i - 1) + margins.top);
      }

    };

    drawRects(data, 1);



  };

  return {
    drawMenu: drawMenu
  };
});