'use strict';

/* global OAuth */

var angularApp = angular.module('angularApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'appControllers',
    'ngResource',
    'google-maps',
    'ui.router',
    'ezfb'
  ]);

angularApp.config(function($urlRouterProvider, $stateProvider, $FBProvider) {

    $FBProvider.setInitParams({
      appId: '342970865841932'
    });

    OAuth.initialize('IQqjfz7Hzomr2m_iZBaIlnAiTBI');

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
      })
      .state('wrapper.settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .state('wrapper.mobile', {
        url: '/mobile',
        templateUrl: 'views/mobile.html',
        controller: 'MobileCtrl'
      })
      .state('wrapper.mobile.todo', {
        templateUrl: 'views/widgets/mobile/mobile.todo.html'
      })
      .state('wrapper.mobile.social', {
        templateUrl: 'views/widgets/mobile/mobile.social.html'
      })
      .state('wrapper.radial', {
        url: '/radial',
        templateUrl: 'views/radial.html',
        controller: 'RadialCtrl'
      })
      .state('wrapper.idle', {
        url: '/idle',
        templateUrl: 'views/idle.html',
        controller: 'MainCtrl'
      });
  });