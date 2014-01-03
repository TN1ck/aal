'use strict';

/* global angular, moment */

var appControllers = angular.module('appControllers');


appControllers.controller('SettingsCtrl', function ($scope, Persistence) {

    var foo = Persistence.todo.get();
    foo.$promise.then(function(data) {
        console.log(data);
      });

  });

