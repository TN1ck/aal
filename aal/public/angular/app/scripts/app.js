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
    'ezfb',
    'webcam',
    'monospaced.qrcode'
  ]);

angularApp.config(function($urlRouterProvider, $stateProvider, $FBProvider) {

    $FBProvider.setInitParams({
      appId: '342970865841932'
    });

    OAuth.initialize('IQqjfz7Hzomr2m_iZBaIlnAiTBI');

    $urlRouterProvider
      .otherwise('/nouser');

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
      .state('wrapper.social', {
        url: '/socialgraph',
        templateUrl: 'views/socialgraph.html',
        controller: 'MainCtrl'
      })
      .state('wrapper.nouser', {
        url: '/nouser',
        templateUrl: 'views/nouser.html',
        controller: 'MainCtrl'
      })
      .state('wrapper.waiting', {
        url: '/waiting',
        templateUrl: 'views/waiting.html',
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
      .state('wrapper.fair', {
        url: '/fair',
        templateUrl: 'views/fair.html',
        controller: 'MainCtrl'
      })
      .state('wrapper.settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .state('wrapper.mobile', {
        templateUrl: 'views/mobile.html',
        controller: 'MobileCtrl'
      })
      .state('wrapper.mobile.navigation', {
        url: '/mobile',
        templateUrl: 'views/widgets/mobile/mobile.navigation.html'
      })
      .state('wrapper.mobile.todo', {
        templateUrl: 'views/widgets/mobile/mobile.todo.html'
      })
      .state('wrapper.mobile.social', {
        templateUrl: 'views/widgets/mobile/mobile.social.html'
      })
      .state('wrapper.mobile.calendar', {
        templateUrl: 'views/widgets/mobile/mobile.calendar.html'
      })
      .state('wrapper.mobile.mail', {
        templateUrl:  'views/widgets/mobile/mobile.mail.html'
      })
      .state('wrapper.mobile.googleLogin', {
        templateUrl: 'views/widgets/mobile/mobile.googleLogin.html'
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
      })
      .state('wrapper.auth', {
        url: '/auth',
        template: '<div class="auth" ui-view></div>',
        abstract: true,
        controller: 'AuthCtrl'
      })
      .state('wrapper.auth.welcome', {
        url: '/welcome',
        templateUrl: 'views/auth/welcome.html'
      })
      .state('wrapper.auth.unknown', {
        url: '/unknown',
        templateUrl: 'views/auth/unknown.html'
      })
      .state('wrapper.auth.new', {
        url: '/new',
        templateUrl: 'views/auth/new.html'
      })
      .state('wrapper.auth.loading', {
        url: '/loading',
        templateUrl: 'views/auth/loading.html'
      })
      .state('wrapper.auth.train', {
        url: '/train',
        templateUrl: 'views/auth/train.html'
      })
      .state('test', {
        url: '/test',
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      });
  });