'use strict';

var angularApp = angular.module('angularApp', [
    'ngRoute',
    'ngAnimate',
    'angular-flip',
    'appControllers',
    'google-maps',
    'ui.router'
  ]);

angularApp.config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('wrapper', {
        abstract: true,
        templateUrl: 'views/wrapper.html',
        controller: 'MainCtrl'
      })
      .state('wrapper.main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('wrapper.toygamer', {
        url: '/toygamer',
        templateUrl: 'views/toygamer.html',
        controller: 'MainCtrl'
      })
      .state('wrapper.playground',{
        url: '/playground',
        templateUrl: 'views/playground.html',
        controller: 'MainCtrl'
      });
  });