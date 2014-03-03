'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl',
  function (SocialComparison, $scope, $q, $FB, $timeout, colorUtils, WidgetData, $rootScope, RadialService, TextTransmission, cssService, $state, widgetPersonal) {

    WidgetData.compareTwoPersons.then(function(result) {
      $rootScope.comparedData = result.call(this, 'maximilian.bachl', 'nyelkenci', function(data) {
        $rootScope.comparedData = data;
      });
    });

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

      // if (WidgetData[d.name]) {
      //   console.log('What is this?', WidgetData[d.name], d.name);
      //   WidgetData[d.name].then(
      //     function(data) {
      //       console.log('$scope[social]??', $scope[d.name]);
      //       if ($rootScope.currentUser && !$rootScope.currentUser.fbResolved) {
      //         $scope[d.name] = data;
      //         console.log('This social promis was resolved');
      //         $rootScope.currentUser.fbResolved = true;
      //       }
      //     }, function (cleardata) {
      //       console.log('Data in reject social promise: ',cleardata);
      //       $scope[d.name] = cleardata;
      //     }, function (notification) {
      //       console.log('Notification: ' , notification);
      //     });
      // }
      // if (d.name === 'social') {
      //   console.log('$scope[d.name]',$scope[d.name], $rootScope.socialData);
      //   $scope[d.name] = $rootScope.socialData;
      // }
      return {
        name: d.name,
        data: d.name,
        css: $scope.css[i],
        color: $scope.colors[i],
        socket: d.socket
      };
    });

    $rootScope.getCssForWidget = function (name) {
      var wdgt = $rootScope.widgets.filter(
        function(el) {
          return el.name === name;
        }
      )[0];
      return wdgt.css;
    };

    $rootScope.getSocketForWidget = function (name) {
      var wdgt = $rootScope.widgets.filter(
        function(el) {
          return el.name === name;
        }
      )[0];
      return wdgt.socket;
    };

    $rootScope.clearAllWidgetData = function () {
      console.log('Clear all widget Data!', $rootScope.widgets);
      for (var i = 0; i < $rootScope.widgets.length; i++) {
        $rootScope.widgets[i].data = undefined;
      }
      $rootScope.posts = undefined;
      // console.log('Clear all widget Data: ' ,$rootScope.widgets['social']);
      // $rootScope.widgets['social'].reject('test');
      // $rootScope.clearSocialData();
      console.log('Clearead all widget Data!', $rootScope.widgets);
      // $state.reload();

    };

    console.log($rootScope.users, $rootScope.currentUser);

    $rootScope.users = $rootScope.users || [];

    $rootScope.currentUser = $rootScope.currentUser || false;

    $rootScope.knownUsers = $rootScope.knownUsers || [];
    $rootScope.unknownUsers = $rootScope.unknownUsers || [];

    $scope.alerts = [];

    $(document).on('keypress', function(e) {

      switch(e.keyCode) {

      case 48:
        // $rootScope.currentUser = false;
        // $state.transitionTo('wrapper.auth.loading');
      }

    });


    // Listen for user changes, this is important for ALL widgets

    if ($(window).width() > 1100) {

      //helper functions
      var isUndetected = function (user) {
        if (user.userID === -2) {
          return true;
        } else {
          return false;
        }
      };

      var isUnknown = function (user) {
        if (user.userID === -1) {
          return true;
        } else {
          return false;
        }
      };

      var isKnown = function (user) {
        if (user.userID >= 0) {
          return true;
        } else {
          return false;
        }
      };

      var containsUID = function (array, uid) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].userID === uid) {
            return true;
          }
        }
        return false;
      };

      var containsNiteID = function (array, nid) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].niteID === nid) {
            return true;
          }
        }
        return false;
      };



      TextTransmission.fetchDataForWall(function (data) {
        // console.log(data.data, $state.current.name, $rootScope.currentUser, $rootScope.knownUsers, $rootScope.unknownUsers);
        // console.log('isKnown: ', isKnown(data.data), 'isUnknown: ', isUnknown(data.data), 'isUndetected: ', isUndetected(data.data));

        console.log('ADD_USER:', data);
        if ($rootScope.knownUsers.length === 0 && $rootScope.unknownUsers.length === 0 && data.data.userID === -2) {
          $state.transitionTo('wrapper.auth.loading');
        }
        if (data.data.userID > -2){
          if (data.data.userID >= 0) {
            console.log('IF bedingung: ' ,containsUID($rootScope.knownUsers,data.data.userID));
            if (containsUID($rootScope.knownUsers,data.data.userID)) {
              console.log('ERROR: knownUsers already contains an entry with that userID',data.data.userID);
            } else {
              console.log('I push data in uid>=0', data.data);
              $rootScope.knownUsers.push(data.data);
              if (containsNiteID($rootScope.unknownUsers,data.data.niteID)) {
                for (var index = 0; index < $rootScope.knownUsers.length; index++) {
                  if ($rootScope.knownUsers[index].niteID === data.data.niteID) {
                    break;
                  }
                }
                $rootScope.unknownUsers.splice(index,1);
                if ($state.current.name === 'wrapper.waiting') {
                  $state.transitionTo('wrapper.main');
                }
              }
            }
          } else if (data.data.userID === -1) {
            if (containsNiteID($rootScope.unknownUsers,data.data.niteID)) {
              console.log('ERROR: unknownUsers already contains an entry with that niteID',data.data.niteID);
            } else {
              console.log('I push data in uid===-1', data.data);
              $rootScope.unknownUsers.push(data.data);
            }
          }
          if ($rootScope.knownUsers.length === 0 && $rootScope.unknownUsers.length === 1) {
            console.log('I set currentUser to unknownUser');
            $rootScope.currentUser = data.data;
            $state.transitionTo('wrapper.auth.unknown');
          } else if ($rootScope.knownUsers.length === 1 && $rootScope.unknownUsers.length === 0) {
            console.log('I set currentUser to knownUser');
            $rootScope.currentUser = data.data;
            $state.transitionTo('wrapper.auth.welcome');
          } else if ($rootScope.currentUser && $state.current.name !== 'wrapper.auth.loading' && $state.current.name !== 'wrapper.waiting' && $state.current.name !== 'wrapper.auth.unknown' && $state.current.name !== 'wrapper.auth.welcome') {
            if (data.data.userID >= 0) {
              $state.transitionTo('wrapper.social');
            } else if (data.data.userID === -1) {
              $scope.alerts.push({
                data: data.data,
                msg: 'Neuer unbekannter User entdeckt! Bewegen Sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
              });
              $timeout(function() {
                $scope.alerts.shift();
                console.log('DELETED ALERT');
              }, 5000);
            }
          }  else if ($rootScope.currentUser && ($state.current.name === 'wrapper.auth.loading' || $state.current.name === 'wrapper.waiting' || $state.current.name === 'wrapper.auth.unknown' || $state.current.name === 'wrapper.auth.welcome')) {
            if (data.data.userID >= 0) {
              $scope.alerts.push({
                data: data.data,
                msg: 'Neuer bekannter User entdeckt! Wenn sie nach dem anmelden den Social-Graph angzeigt haben möchten, bewegen Sie beide Arme nach oben!'
              });
              $timeout(function() {
                $scope.alerts.shift();
                console.log('DELETED ALERT');
              }, 5000);
            }
          }
          // TODO: else case what should happen, if an other known user enters wall during login cycle

        }

      }, 'ADD_USER');

      TextTransmission.fetchDataForWall(function (data) {
        console.log('REMOVE_USER: ' , data);
        if (containsNiteID($rootScope.knownUsers,data.data.niteID)){
          for (var index = 0; index < $rootScope.knownUsers.length; index++) {
            if ($rootScope.knownUsers[index].niteID === data.data.niteID) {
              break;
            }
          }
          $rootScope.knownUsers.splice(index,1);
          if ($rootScope.knownUsers.length === 0 && $rootScope.unknownUsers.length === 0){
            $rootScope.currentUser = $rootScope.knownUsers[0];
            // DO fb logout???
            $state.transitionTo('wrapper.nouser');
          } else if ($state.current.name === 'wrapper.main' && $rootScope.currentUser.niteID === data.data.niteID) {
            if ($rootScope.knownUsers.length > 0) {
              // do the fb Logout
              // WidgetData.logoutFB2nd();
              $FB.getLoginStatus(WidgetData.logoutFB);
              $rootScope.clearAllWidgetData();
              $rootScope.currentUser = $rootScope.knownUsers[0];
              // $state.reload();
            } else if ($rootScope.unknownUsers.length > 0) {
              // do the fb Logout
              // WidgetData.logoutFB2nd();
              $FB.getLoginStatus(WidgetData.logoutFB);
              $rootScope.clearAllWidgetData();
              $rootScope.currentUser = $rootScope.unknownUser[0];
              $state.transitionTo('wrapper.auth.unkown');
            }
          } else if ($state.current.name === 'wrapper.social' && $rootScope.currentUser.niteID === data.data.niteID) {
            if ($rootScope.knownUsers.length >= 2) {
              // do the fb Logout
              // WidgetData.logoutFB2nd();
              $FB.getLoginStatus(WidgetData.logoutFB);
              $rootScope.clearAllWidgetData();
              $rootScope.currentUser = $rootScope.knownUsers[0];
              // UPDATE SOCIAL
            } else if ($rootScope.knownUsers.length === 1) {
              console.log($FB);
              // do the fb Logout
              // WidgetData.logoutFB2nd();
              $FB.getLoginStatus(WidgetData.logoutFB);
              $rootScope.clearAllWidgetData();
              $rootScope.currentUser = $rootScope.knownUsers[0];
              $state.transitionTo('wrapper.main');
            } else {
              console.log('Else case in REMOVE_USER. Should not happen!');
            }
          } else if ($state.current.name === 'wrapper.social' && $rootScope.currentUser.niteID !== data.data.niteID) {
            if ($rootScope.knownUsers.length >= 2) {
              //  UPDATE SOCIAL
            } else {
              $state.transitionTo('wrapper.main');
            }
          }
        }
        if (containsNiteID($rootScope.unknownUsers,data.data.niteID)){
          for (var index = 0; index < $rootScope.knownUsers.length; index++) {
            if ($rootScope.knownUsers[index].niteID === data.data.niteID) {
              break;
            }
          }
          $rootScope.unknownUsers.splice(index,1);
          if ($rootScope.unknownUsers.length ===  0  && $rootScope.knownUsers.length ===  0){
            $state.transitionTo('wrapper.nouser');
          }
        }
      }, 'REMOVE_USER');
      
      TextTransmission.fetchTextForWall(function(data) {
          try {
            console.log('DATEN EMPFANGEN');
            widgetPersonal.fetchPersonal(data.data);
            WidgetData.updateApiCall(data.data);
          } catch (e) {
            console.log(e);
          }
        },'FBAUTH');


      var Menu = new RadialService.Menu({selector: '#right'});

      $scope.initWallWithTestData = function () {
        TextTransmission.deliverDataForWall({entries: [{name: 'Birthday Party', description: 'Meet lots of people!', location: 'TU Berlin', startTime: moment(), endTime: moment()},{name: 'Homework', description: 'Do a lot of work!', location: 'TU Berlin', startTime: moment(), endTime: moment()},{name: 'Meeting', description: 'Discuss buz stuff!', location: 'Bussiness Center', startTime: moment(), endTime: moment()},{name: 'Stuff', description: 'Chicken!', location: 'Chicken town', startTime: moment(), endTime: moment()}]},'CALENDAR');
        TextTransmission.deliverDataForWall({items: [{text: 'Do groceries', prio: 'HIGH', created: moment()},{text: 'Clean room', prio: 'MIDDLE', created: moment()},{text: 'Homework', prio: 'LOW', created: moment()},{text: 'Buy Car', prio: 'LOW', created: moment()}]}, 'TODO');
        TextTransmission.deliverDataForWall({news: [{title: 'Klitschko fights', description: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN'},{title: 'Klitschko fought', description: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN'},{title: 'Klitschko won', description: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN'}]}, 'NEWS');
        TextTransmission.deliverDataForWall({mails: [{from: 'Klitschko', content: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN', received: moment(), subject: 'Yummy yummy'},{from: 'Your Mom', content: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN', received: moment(), subject: 'You have to do ballet'},{from: 'Your girlfriend', content: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN', received: moment(), subject: 'I slept with tom'}]}, 'MAIL');
      };
    }

  });

