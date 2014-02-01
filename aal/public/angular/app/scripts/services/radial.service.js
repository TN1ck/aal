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

    svg = svg.append('g');

    var oldRects = {};
    var oldText = {};

    var drawRects = function(data, level) {

      var rects = svg.selectAll('.rects-new').data(data);
      var text = svg.selectAll('.text-new').data(data);
      oldText['.text-' + level] = text;
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
          return colors[(i + level) % colors.length];
        })
        .on('click', function(d) {
          var data = [];
          var rand = Math.random() * 4 + 2;

          for (var i = 0; i < rand; i++) {
            data.push({text: 'test'});
          }

          console.log(data, rand);
          drawRects(data, level + 1);
        });

      text.enter()
        .append('text')
        .text(function(d) {
          return d.text;
        })
        .attr('class', 'svg-menu-text text-' + level)
        .attr('x', function(d, i) {
          return x(i) + 5;
        })
        .attr('y', elHeight * level + margins.top + elHeight - 5)
        .style('fill', 'white');

      for (var i = 1; i <= level; i++) {
        var or = oldRects['.rects-' + i];
        var ot = oldText['.text-' + i];
        
        or.transition()
          .duration(transitionTime)
          .attr('height', elHeight)
          .attr('y', elHeight * (i - 1) + margins.top);
        
        ot.transition()
          .duration(transitionTime)
          .attr('y', elHeight * (i - 1) + margins.top + elHeight - 5);
      }

    };

    drawRects(data, 1);



  };

  return {
    drawMenu: drawMenu
  };
});