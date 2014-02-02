'use strict';

/* global angular */

var app = angular.module('angularApp');

app.factory('FacebookPost', function() {
  return {
    facebookPost: {
      method: 'feed',
      name: 'The Wall rocks!',
      picture: 'http://www3.math.tu-berlin.de/stoch/nf-stoch/TUB-logo.png',
      link: 'http://www.tu-berlin.de',
      description: 'The Wall is a project build in Ambient Assistent Living project at DAI-Labor at TU-Berlin.'
    }
  };
});