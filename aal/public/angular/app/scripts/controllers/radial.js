'use strict';

/* global angular */

var appControllers = angular.module('appControllers');


appControllers.controller('RadialCtrl', function (RadialService) {

  RadialService.drawRadial({
    selector: '#right',
    data: [
      {text: 'test', color: 0, data: [{text: 'bla', color: 2}, {text: 'bla', color: 3}]},
      {text: 'test', color: 1, data: [{text: 'bla', color: 4}, {text: 'bla', color: 5}, {text: 'bla', color: 2}]}
    ]


  });

});

