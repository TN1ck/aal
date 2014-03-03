'use strict';

/* global angular, d3, $ */

var app = angular.module('angularApp');


app.factory('RadialService', function($rootScope, WidgetData) {

  var KEYMAPPING = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    TOGGLE: 50,
    SELECT: 13
  };

  var Menu = function(dict) {

    var data = {};

    var colors = WidgetData.colors;

    // This data won't change
    var selector = dict.selector,
        $svg = $(selector),
        svg = d3.select(selector),
        $width = $svg.width(),
        $height = $svg.height(),
        margins = {left: 10, right: 10, top: 10, bottom: 10},
        transitionTime = 1000;

    svg = svg.append('g');

    var oldRects = {};
    var oldText = {};
    var currentlySelected = 0;
    var currentLength = 0;
    var level = 0;
    var menuOn = false;

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

        currentLength = oldRects['.rects-' + level] ? oldRects['.rects-' + level][0].length : 0;

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

    var selectData = function() {

      if (level === 1) {
        
        var $widgets = $('widget');

        data = $rootScope.widgets.map(function(d, i) {
          d.jquery = $widgets[i];
          return d;
        });
      
      } else if (level === 2) {

        var newData = $('widget-' + currentElem.name).find('.widget').map(function() {
          return {
            jquery: this,
            color: currentElem.color,
            name: currentElem.name
          };
        });

        data = newData;
      
      } else if (level === 3) {
        data = $('.popover').find('button').map(function() {
          return {
            jquery: this,
            color: currentElem.color,
            name: $(this).html()
          };
        });

      }

      return data;

    };

    var enterMenu = function() {
      
      if (level === 0 || level === 1) {
        level++;
        drawRects(selectData());
      }

    };

    var exitMenu = function() {
      
      $('.popover').remove();
      if (level !== 1) {
        var inverted = $(currentElem.jquery).attr('class').match(/widget-color-\d/);
        inverted = inverted ? inverted[0] + '-inverted' : '';
        $('.border').removeClass('border').removeClass(inverted);
      }
      level--;
      updateRects(level);
      selectData();
      if (level === 0) {
        $('.border').removeClass('border');
      }

    };

    var moveMenuLeft = function() {
      currentlySelected = currentlySelected === 0 ? (currentLength - 1) : (currentlySelected - 1) % currentLength;
      updateRects(level);
      if (level === 1 || level === 2 || level === 3) {
        markElem();
      }
    };

    var moveMenuRight = function() {
      currentlySelected = (currentlySelected + 1) % currentLength;
      updateRects(level);
      if (level === 1 || level === 2 || level === 3) {
        markElem();
      }
    };

    var selectElement = function() {
      
      if (level === 1) {
        toggleScreens();
        updateRects(1, selectData());
      } else if (level === 2) {
        $(currentElem.jquery).click();
        level++;
        if (selectData().length > 0) {
          drawRects(selectData());
          markElem();
        } else {
          level--;
        }
      } else if (level === 3) {
        console.log('selecting popup');
        $(currentElem.jquery).click();
      }

    };

    var toggleScreens = function () {

      var widgetBig = $rootScope.widgets[2];
      $rootScope.widgets[2] = $rootScope.widgets[currentlySelected];
      $rootScope.widgets[currentlySelected] = widgetBig;
      $rootScope.$apply();

    };

    var markElem = function() {
      
      if (level !== 3) {
        $('.popover').remove();
      }
      var inverted = $(currentElem.jquery).attr('class').match(/widget-color-\d/);
      inverted = inverted ? inverted[0] + '-inverted' : '';
      $('.border').removeClass('border').removeClass(inverted);
      $(currentElem.jquery)
        .addClass(inverted)
        .addClass('border');
    };
    

    d3.select('body')
      .on('keydown', function() {
      
      switch (d3.event.keyCode) {
      
      case KEYMAPPING.TOGGLE:
        console.log('TOGGLE key pressed');
        if (!menuOn) {
          if (level === 0) {
            menuOn = true;
            enterMenu();
            markElem();
          }
        } else {
          while (level > 0) {
            exitMenu();
          }
          menuOn = false;
        }
        break;
      case KEYMAPPING.LEFT:
        console.log('LEFT key pressed');
        moveMenuLeft();
        break;
      case KEYMAPPING.RIGHT:
        console.log('RIGHT key pressed');
        moveMenuRight();
        break;
      case KEYMAPPING.UP:
        console.log('UP key pressed');
        if (level !== 0) {
          exitMenu();
        }
        break;
      case KEYMAPPING.SELECT:
        console.log('SELECT key pressed');
        selectElement();
        break;

      case KEYMAPPING.DOWN:
        console.log('DOWN key pressed');
        enterMenu();
        markElem();
        break;

      }

    });

  };

  return {
    KEYMAPPING: KEYMAPPING,
    Menu: Menu
  };
});