'use strict';

var angularApp = angular.module('angularApp', [
    'ngRoute',
    'ngAnimate',
    'angular-flip',
    'appControllers',
    'google-maps'
]);

angularApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/toygamer', {
                templateUrl: 'views/toygamer.html',
                controller: 'MainCtrl'
            })
            .when('/playground', {
                templateUrl: 'views/playground.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        }
]);