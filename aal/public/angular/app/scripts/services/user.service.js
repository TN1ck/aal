'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('user', function() {
  

  return {
    get: {
      firstName: 'Tom',
      lastName: 'Nick',
      picture: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-frc1/t1/1005774_10200120425485400_204789353_n.jpg',
      id: 1,
      verified: false
    }
  };

});