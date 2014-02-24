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

    console.log($rootScope.users, $rootScope.currentUser);

    $rootScope.users = $rootScope.users || [];

    $rootScope.currentUser = $rootScope.currentUser || false;

    $scope.alerts = [];

    $(document).on('keypress', function(e) {

      switch(e.keyCode) {
        
      case 48:
        // $rootScope.currentUser = false;
        // $state.transitionTo('wrapper.auth.loading');
      }

    });


    // Listen for user changes, this is important for ALL widgets
    TextTransmission.fetchDataForWall(function(data) {
        
        console.log('ADD USER!', $rootScope.currentUser, data.data);

        // okay, first check if a currentUser is set

        // if not, set it and go to loading screen
        if (!$rootScope.currentUser) {
          console.log('NO CURRENT_USER, GO TO LOADING SCREEN', $rootScope.currentUser);
          $rootScope.currentUser = data.data;
          $rootScope.users.push(data.data);
          $state.transitionTo('wrapper.auth.loading');
        
        // if a currentUser is set, check his niteID is equal to the incoming message and go to welcome/unkown
        // if he does not have a userID (-2)
        } else if (data.data.niteID === $rootScope.currentUser.niteID && $rootScope.currentUser.userID === -2) {
          
          $rootScope.currentUser = data.data;
          
          // The user is known to the system
          if ($rootScope.currentUser.userID >= 0) {
            $state.transitionTo('wrapper.auth.welcome');
          // user is unknown
          } else if ($rootScope.currentUser.userID === -1) {
            $state.transitionTo('wrapper.auth.unknown');
          }

        }

        // filter the current user and drop wthe ones with the same id
        var filteredUsers = $rootScope.users.filter(function(d) {
          if ($rootScope.currentUser.niteID === data.data.niteID) {
            $rootScope.currentUser = data.data;
          }
          return d.niteID !== data.data.niteID;
        });

        // check if the current message is currently in the alerts messages
        var alertsFilter = $scope.alerts.filter(function(d) {
          return d.niteID === data.data.niteID;
        });

        if ($rootScope.currentUser && filteredUsers.length === $rootScope.users.length) {
          $rootScope.users.push(data.data);
          
          if (alertsFilter.length === 0) {
            $scope.alerts.push({
              data: data.data,
              msg: 'Neuer User wurde erkannt! Bewegen sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
            });
          }

          $timeout(function() {
            $scope.alerts.shift();
            console.log('DELETED ALERT');
          }, 5000);


        } else if ($rootScope.currentUser) {
          
          $rootScope.users = filteredUsers;
          $rootScope.users.push(data.data);
          
          if (alertsFilter.length === 0) {
            $scope.alerts.push({
              data: data.data,
              msg: 'Neuer User wurde erkannt! Bewegen sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
            });
          }

          $timeout(function() {
            $scope.alerts.shift();
            console.log('DELETED ALERT');
          }, 5000);
        }


      }, 'ADD_USER');


    TextTransmission.fetchDataForWall(function(data) {
        console.log('REMOVED USER', data.data);

        if (data.data.niteID === $rootScope.currentUser.niteID) {
          $rootScope.currentUser = false;
        }
        
        $rootScope.users = $rootScope.users.filter(function(d) {
          return d.niteID !== data.data.niteID;
        });


        if (!$rootScope.currentUser && $rootScope.users.length >= 1) {
          console.log('FUCK THIS, TRANSITION TO LOADING');
          $rootScope.currentUser = $rootScope.users.shift();
          $state.transitionTo('wrapper.auth.loading');
        }


        if (!$rootScope.currentUser) {
          $state.transitionTo('wrapper.main');
        }

      }, 'REMOVE_USER');




    var Menu = new RadialService.Menu({selector: '#right'});


  });

