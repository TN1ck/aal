'use strict';

var angularApp = angular.module('angularApp', [
    'ngRoute',
    'ngAnimate',
    'angular-flip',
    'appControllers'
]);

angularApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            }).
            when('/toygamer', {
                templateUrl: 'views/toygamer.html',
                controller: 'MainCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);
/*
angular.module('angularApp', ['ngRoute', 'ngAnimate', 'angular-flip'])
  .config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).
    when('/views/toygamer.html', {
        templateUrl: 'views/toygamer.html',
        controller: 'MainCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
  });
*/