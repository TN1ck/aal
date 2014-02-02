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
        transitionTime = 1000;

    svg = svg.append('g');

    var oldRects = {};
    var oldText = {};
    var currentlySelected = 0;
    var currentLength = 0;
    var level = 0;

    var updateRects = function(level) {

      var elHeight = ($height - (margins.top + margins.bottom))/level;

      for (var i = 1; i <= level; i++) {
        var or = oldRects['.rects-' + i];
        var ot = oldText['.text-' + i];
        
        or.transition()
          .duration(transitionTime)
          .attr('height', elHeight)
          .attr('y', elHeight * (i - 1) + margins.top);
        
        if (i === level) {
          or.style('fill', function(d, j) {
            return j === currentlySelected ? 'gray' : colors[i % colors.length];
          });
        }

        ot.transition()
          .duration(transitionTime)
          .attr('y', elHeight * (i - 1) + margins.top + elHeight - 5);
      }
    };

    var drawRects = function(data) {

      currentLength = data.length;
      currentlySelected = currentLength > currentlySelected ? currentlySelected : currentLength - 1;

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
          return i === currentlySelected ? 'gray' : colors[level % colors.length];
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


      updateRects(level);

    };
    
    d3.select('body')
      .on('keydown', function() {
      
      switch (d3.event.keyCode) {
      
      case 50:
        level++;
        if (level === 1) {
          drawRects(data);
        } else {
          
          var randData = [];
          var rand = Math.random() * 4 + 2;

          for (var i = 0; i < rand; i++) {
            randData.push({text: 'test'});
          }

          drawRects(randData);
        
        }
        break;
      case 49:
        currentlySelected = currentlySelected > 0 ? currentlySelected - 1 : currentlySelected;
        updateRects(level);
        break;
      case 51:
        currentlySelected = currentlySelected < (currentLength - 1) ? currentlySelected + 1 : currentlySelected;
        updateRects(level);
        break;
      

      }

    });



  };

  return {
    drawMenu: drawMenu
  };
});