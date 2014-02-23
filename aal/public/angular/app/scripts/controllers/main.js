'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl',
  function ($scope, $q, $FB, $timeout, colorUtils, WidgetData, $rootScope, RadialService, TextTransmission, cssService, $state) {

    $scope.colors = WidgetData.colors;
    $scope.css = cssService.createCss($scope.colors);

    $rootScope.uid = 1337;

    /*
    Add the data to the scope, later we should do this directly in the directives
    */
    // next line is important for displaying mobile id in personal widget
    $scope.mobileId = TextTransmission.mobileId;
    $rootScope.mobileId = TextTransmission.mobileId;
    $rootScope.widgets = WidgetData.widgets.map(function(d, i) {
      if (WidgetData[d.name]) {
        WidgetData[d.name].then(function(data) {
          $scope[d.name] = data;
        });
      }
      return {
        name: d.name,
        data: d.name,
        css: $scope.css[i],
        color: $scope.colors[i],
        socket: d.socket
      };
    });

    $rootScope.getCssForWidget = function (name) {
      console.log('Someone wants the Css for a certain widget.');
      var wdgt = $rootScope.widgets.filter(
        function(el) {
          return el.name === name;
        }
      )[0];
      console.log(wdgt.css);
      return wdgt.css;
    };

    $rootScope.getSocketForWidget = function (name) {
      console.log('Someone wants the Socket for a certain widget.');
      var wdgt = $rootScope.widgets.filter(
        function(el) {
          return el.name === name;
        }
      )[0];
      console.log(wdgt.socket);
      return wdgt.socket;
    };

    $rootScope.users = [];
    $rootScope.currentUser = false;

    $scope.alerts = [];

    // Listen for user changes, this is important for ALL widgets
    TextTransmission.fetchDataForWall(function(data) {

        if (!$rootScope.currentUser) {
          console.log('NEW USER!');
          $rootScope.currentUser = data.data;
          $state.transitionTo('wrapper.auth.loading');
        }

        console.log('ADDED USER', data.data);
        var filteredUsers = $rootScope.users.filter(function(d) {
          return d.niteID !== data.data.niteID;
        });
        if (filteredUsers.length === $rootScope.users.length) {
          $rootScope.users.push(data.data);
          
          $scope.alerts.push({
            msg: 'Neuer User wurde erkannt! Bewegen sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
          });

          $timeout(function() {
            $scope.alerts.shift();
            console.log('DELETED ALERT');
          }, 15000);

        } else {
          
          $rootScope.users = filteredUsers;
          $rootScope.users.push(data.data);
          
          $scope.alerts.push({
            msg: 'Neuer User wurde erkannt! Bewegen sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
          });

          $timeout(function() {
            $scope.alerts.shift();
            console.log('DELETED ALERT');
          }, 15000);
        }


      }, 'ADD_USER');


    TextTransmission.fetchDataForWall(function(data) {
        console.log('REMOVED USER', data.data);

        if ($rootScope.currentUser.niteID === data.data.niteID && $rootScope.users.length >= 1) {
          $rootScope.currentUser = $rootScope.users.shift();
          $state.transitionTo('wrapper.main');
        }

        $rootScope.users = $rootScope.users.filter(function(d) {
          return d.niteID !== data.data.niteID;
        });

        if ($rootScope.users.length === 0) {
          $rootScope.currentUser = false;
          $state.transitionTo('wrapper.main');
        }

      }, 'REMOVE_USER');




    var Menu = new RadialService.Menu({selector: '#right'});


  });

