'use strict';

/* global angular, d3, $ */

var app = angular.module('angularApp');


app.factory('RadialService', function($rootScope, WidgetData) {

  var Menu = function(dict) {

    var colors = WidgetData.colors;

    // This data won't change
    var selector = dict.selector,
        $svg = $(selector),
        svg = d3.select(selector),
        $width = $svg.width(),
        $height = $svg.height(),
        margins = {left: 10, right: 10, top: 10, bottom: 10},
        data = $rootScope.widgets,
        transitionTime = 1000;

    svg = svg.append('g');

    var oldRects = {};
    var oldText = {};
    var currentlySelected = -1;
    var currentLength = 0;
    var level = 0;

    var updateRects = function(level, data) {

      var elHeight = ($height - (margins.top + margins.bottom))/(level || 1);


      for (var i = 1; i <= level; i++) {
        
        var or = oldRects['.rects-' + i];
        var ot = oldText['.text-' + i];
        var x;

        if (data && i === level) {
          x = d3.scale.linear()
            .domain([0, data.length])
            .rangeRound([margins.left, $width - margins.right]);

          or = or.data(data);
          ot = ot.data(data);
        }
        
        if (i === level) {

          or.style('fill', function(d, j) {
            if (j === currentlySelected) {
              currentElem = d;
            }
            return j === currentlySelected ? 'gray' : (d.color || colors[i % colors.length]);
          });
        }

        var ort = or.transition()
          .duration(transitionTime)
          .attr('height', elHeight)
          .attr('y', elHeight * (i - 1) + margins.top);

        var ott = ot.transition()
          .duration(transitionTime)
          .style('opacity', 1)
          .text(function(d) {
            return d.name;
          })
          .attr('y', elHeight * (i - 1) + margins.top + elHeight - 5);

      }

      // remove previous level
      
      var orn = oldRects['.rects-' + (level + 1)];
      var otn = oldText['.text-' + (level + 1)];

      if (orn && otn) {

        currentLength = oldRects['.rects-' + level][0].length;

        orn.transition()
        .duration(transitionTime)
        .attr('height', 0)
        .attr('y', elHeight * level + margins.top)
        .each('end', function() {
          this.remove();
        });

        otn.transition()
        .duration(transitionTime)
        .style('opacity', 0)
        .attr('y', elHeight * level + margins.top + elHeight - 5)
        .each('end', function() {
          this.remove();
        });

      }

    };

    var currentElem = {};
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
          return i === currentlySelected ? 'gray' : (d.color || colors[level % colors.length]);
        });

      text.enter()
        .append('text')
        .text(function(d) {
          return d.name;
        })
        .style('opacity', 0)
        .attr('class', 'svg-menu-text text-' + level)
        .attr('x', function(d, i) {
          return x(i) + 5;
        })
        .attr('y', elHeight * level + margins.top + elHeight - 5)
        .style('fill', 'white');

      updateRects(level);

    };

    this.enterMenu = function() {
      
      level++;
      
      if (level === 1) {
        
        drawRects(data);
      
      } else if (level === 2) {

        var newData = $('widget-' + currentElem.name).find('.widget').map(function() {
          return {
            jquery: this,
            color: currentElem.color,
            name: currentElem.name
          };
        });

        console.log(newData);

        currentElem.data = newData;

        drawRects(currentElem.data);
      
      } else if (level >= 3) {
        level--;
        $(currentElem.jquery).click();
      }

    };

    this.exitMenu = function() {
      level--;
      updateRects(level);
    };

    this.moveMenuLeft = function() {
      currentlySelected = currentlySelected === 0 ? (currentLength - 1) : (currentlySelected - 1) % currentLength;
      updateRects(level);
    };

    this.moveMenuRight = function() {
      currentlySelected = (currentlySelected + 1) % currentLength;
      updateRects(level);
    };

    this.updateRects = updateRects;
    
    // d3.select('body')
    //   .on('keydown', function() {
      
    //   switch (d3.event.keyCode) {
      
    //   case 13:
    //     this.enterMenu();
    //     break;
    //   case 37:
    //     this.moveMenuLeft();
    //     break;
    //   case 39:
    //     this.moveMenuRight();
    //     break;
    //   case 27:
    //     this.exitMenu();
    //     break;
      

    //   }

    // });

  };

  return {
    Menu: Menu
  };
});