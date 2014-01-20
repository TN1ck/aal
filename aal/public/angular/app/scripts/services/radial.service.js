'use strict';

/* global angular, d3, $ */

var app = angular.module('angularApp');

app.factory('RadialService', function() {
  
  var drawRadial = function(dict) {

    var colors = ['#B9DC51', '#D4E995', '#73CCED', '#FF7F7F', '#FFBB33', '#FFD580'];

    // This data won't change
    var selector = dict.selector,
        $svg = $(selector),
        svg = d3.select(selector),
        $width = $svg.width(),
        $height = $svg.height(),
        margins = {left: 50, right: 50, top: 50, bottom: 50},
        radius = Math.min(($width - (margins.right + margins.left))/2, $height - (margins.top + margins.bottom)) / 2;

    svg = svg.append('g')
        .attr('transform', 'translate(' + ($width / 2) + ',' + ($height / 2) + ')');

    // for every submenu we need to draw a new menu
    var _drawRadial = function(dict) {

      var data = dict.data,
          angle = 360/data.length;

      var innerRadius = 0.5;

      // PIE
      var arc = d3.svg.arc()
        .outerRadius(radius * innerRadius) // for the fancy animation
        .innerRadius(radius * innerRadius);

      var pie = d3.layout.pie()
        .sort(null)
        .value(function() { return angle; })
        .startAngle(-90 * (Math.PI/180))
        .endAngle(90 * (Math.PI/180));

      var g = svg.selectAll('.arc')
          .data(pie(data))
          .enter().append('g')
          .attr('class', 'arc')
          .on('mouseover', function(d) {

            var arcTween = function arcTween(d) {
              var arc = d3.svg.arc()
                .innerRadius(radius)
                .outerRadius(radius * 1.5);

              var i = d3.interpolate(this._current, d);
              console.log('arctween', d, i(0));
              this._current = i(0);
              return function(t) {
                return arc(i(t));
              };
            };

            var paths = d3.select(this).selectAll('path');
            console.log(paths);
            paths = paths
              .transition()
              .duration(500)
              .attr('d', arc.outerRadius(radius * 1.5));

            var dataTwo = d;

            console.log(d);

            var gTwo = svg.selectAll('.arcTwo')
              .data(pie(dataTwo.data.data));

            console.log(gTwo);

            gTwo
              .transition()
              .each(function(d) {
                var path = d3.select(this).selectAll('path');
                path.transition()
                  .duration(0)
                  .style('fill', colors[d.data.color % colors.length] );
              });
              

            gTwo
              .enter().append('g')
              .attr('class', 'arcTwo')
              .append('path')
              .attr('d',
                d3.svg.arc().outerRadius(radius)
                .innerRadius(radius)
                .startAngle(dataTwo.startAngle)
                .endAngle(dataTwo.endAngle))
              .style('fill', function(d) { return colors[d.data.color % colors.length]; })
              .each(function(d) {
                console.log(d);
                this._current = {
                  data: d.data,
                  value: d.value,
                  startAngle: dataTwo.startAngle,
                  endAngle: dataTwo.endAngle
                };
              })
              .transition()
              .duration(500)
              .attr('d',
                d3.svg.arc()
                .outerRadius(radius * 1.5)
                .innerRadius(radius)
                .startAngle(dataTwo.startAngle)
                .endAngle(dataTwo.endAngle))
              .transition()
              .duration(500)
              .attrTween('d', arcTween);

          });

      g.append('path')
        .attr('d', arc)
        .style('fill', function(d) { return colors[d.data.color % colors.length]; })
        .transition()
        .duration(1000)
        .attr('d', arc.outerRadius(radius));

    };

    _drawRadial(dict);

  };

  return {
    drawRadial: drawRadial
  };
});