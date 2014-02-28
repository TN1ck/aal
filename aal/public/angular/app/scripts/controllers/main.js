'use strict';

/* global angular, moment, OAuth, d3, $ */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl',
  function (SocialComparison, $scope, $q, $FB, $timeout, colorUtils, WidgetData, $rootScope, RadialService, TextTransmission, cssService, $state) {

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
      console.log('Someone wants the Css for a certain widget.' ,name);
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
        console.log(data.data, $state.current.name, $rootScope.currentUser, $rootScope.knownUsers, $rootScope.unknownUsers);
        console.log('isKnown: ', isKnown(data.data), 'isUnknown: ', isUnknown(data.data), 'isUndetected: ', isUndetected(data.data));
        // if (!$rootScope.currentUser){
        //   $rootScope.currentUser = data.data;
        // } else if ($rootScope.currentUser.niteID === data.data.niteID && $rootScope.currentUser.userID !== data.data.userID) {
        //   $rootScope.currentUser = data.data;
        //   $rootScope.knownUsers.push($rootScope.currentUser);
        // } else if ($rootScope.currentUser.niteID !== data.data.niteID) {
        //   if (data.data.userID >= 0) {
        //     $rootScope.knownUsers.push(data.data);
        //   } else if (data.data.userID === -1) {
        //     $rootScope.unknownUsers.push(data.data);
        //   }
        // }


        // put the gotten user into the right array
        // if (data.data.userID >= 0) {
        //   if (containsUID($rootScope.knownUsers,data.data.userID)) {
        //     console.log('ERROR: knownUsers already contains an entry with that userID');
        //   } else {
        //     $rootScope.knownUsers.push(data.data);
        //   }
        // } else if (data.data.userID === -1) {
        //   if (containsUID($rootScope.unknownUsers,data.data.userID)) {
        //     console.log('ERROR: unknownUsers already contains an entry with that userID');
        //   } else {
        //     $rootScope.unknownUsers.push(data.data);
        //   }
        // } else if (data.data.userID === -2 && $rootScope.knownUsers.length === 0) {
        //   $state.transitionTo('wrapper.auth.loading');
        // }
        // if (!$rootScope.currentUser && data.data.userID > -2) {
        //   $rootScope.currentUser = data.data;
        // }

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
            if (containsUID($rootScope.unknownUsers,data.data.userID)) {
              console.log('ERROR: unknownUsers already contains an entry with that userID',data.data.userID);
            } else {
              console.log('I push data in uid===1', data.data);
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

        // if ($state.current.name === 'wrapper.auth.loading' || $state.current.name === 'wrapper.waiting' || $state.current.name === 'wrapper.auth.unknown' || $state.current.name === 'wrapper.auth.welcome') {

        // }
        // if ($rootScope.currentUser.niteID === data.data.niteID){

        //   if ($state.current.name === 'wrapper.nouser' && isUndetected($rootScope.currentUser)) {
        //     console.log('I am in the nouser isUndetected case!');
        //     $state.transitionTo('wrapper.auth.loading');
        //   }
        //   if ($state.current.name === 'wrapper.auth.loading' && isUnknown($rootScope.currentUser)) {
        //     console.log('I am in the loading unknown case!');
        //     $state.transitionTo('wrapper.auth.unknown');
        //   }
        //   if ($state.current.name === 'wrapper.auth.loading' && isKnown($rootScope.currentUser)) {
        //     console.log('I am in the loading known case!');
        //     $state.transitionTo('wrapper.auth.welcome');
        //     // $rootScope.knownUsers.push($rootScope.currentUser);
        //   }
        //   if ($state.current.name === 'wrapper.waiting' && isKnown($rootScope.currentUser)) {
        //     console.log('I am in the waiting known case!');
        //     $state.transitionTo('wrapper.auth.welcome');
        //     // $rootScope.knownUsers.push($rootScope.currentUser);
        //   }
        // }
        // // user has other niteID
        // else {
        //   console.log('Other user stepped in front!', $state.current.name);
        //   // if ($sta) {

        //   // }
        //   if ($state.current.name === 'wrapper.main') {
        //     if (isKnown(data.data)) {
        //       //DISPLAY SOCIAL
        //       $state.transitionTo('wrapper.social');
        //     }
        //     if (isUnknown(data.data)) {

        //       $scope.alerts.push({
        //         data: data.data,
        //         msg: 'Neuer unbekannter User entdeckt! Bewegen Sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
        //       });
        //       $timeout(function() {
        //         $scope.alerts.shift();
        //         console.log('DELETED ALERT');
        //       }, 5000);
        //     }
        //   }
        //   if ($state.current.name === 'wrapper.social') {
        //     // TODO CHECK FOR KNOWN or UNKNOWN
        //     if (isKnown(data.data)) {
        //       // $rootScope.knownUsers.push(data.data);
        //       //UPDATE SOCIAL
        //     }
        //     if (isUnknown(data.data)) {
        //       // $rootScope.unknownUsers.push(data.data);
        //     }
        //   }
        // }

      }, 'ADD_USER');

      TextTransmission.fetchDataForWall(function (data) {
        if (containsNiteID($rootScope.knownUsers,data.data.niteID)){
          for (var index = 0; index < $rootScope.knownUsers.length; index++) {
            if ($rootScope.knownUsers[index].niteID === data.data.niteID) {
              break;
            }
          }
          $rootScope.knownUsers.splice(index,1);
          if ($state.current.name === 'wrapper.main' && $rootScope.knownUsers.length === 0 && $rootScope.unknownUsers.length === 0){
            $rootScope.currentUser = $rootScope.knownUsers[0];
            $state.transitionTo('wrapper.nouser');
          } else if ($state.current.name === 'wrapper.main' && $rootScope.currentUser.niteID === data.data.niteID) {
            if ($rootScope.knownUsers.length > 0) {
              $rootScope.currentUser = $rootScope.knownUsers[0];
            } else if ($rootScope.unknownUsers.length > 0) {
              $rootScope.currentUser = $rootScope.unknownUser[0];
              $state.transitionTo('wrapper.auth.unkown');
            }
          } else if ($state.current.name === 'wrapper.social') {
            if ($rootScope.knownUsers.length >= 2) {
              // UPDATE SOCIAL
            } else if ($rootScope.knownUsers.length === 1) {
              $state.transitionTo('wrapper.main');
            } else {
              console.log('Else case in REMOVE_USER. Should not happen!');
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



        // if (data.data.userID >= 0) {
        //   if ($state.current.name === 'wrapper.main' && $rootScope.currentUser.userID === data.data.userID) {
        //     if ($rootScope.knownUsers.length === 1) {
        //       $rootScope.knownUsers.pop();
        //     } else {
        //       console.log('Length should be 1 not' + $rootScope.knownUsers.length);
        //     }
        //     $rootScope.currentUser = undefined;
        //     $state.transitionTo('wrapper.nouser');
        //   }
        //   if ($state.current.name === 'wrapper.social' && $rootScope.knownUsers.length <= 2) {
        //     for (var i = 0; i < $rootScope.knownUsers.length; i++) {
        //       if ($rootScope.knownUsers[i].userID === data.data.userID) {
        //         $rootScope.knownUsers.splice(i,1);
        //       }
        //     }
        //     if (data.data.userID === $rootScope.currentUser.userID) {
        //       $rootScope.currentUser = $rootScope.knownUsers[0];
        //     }
        //     $state.transitionTo('wrapper.main');
        //   }
        //   if ($state.current.name === 'wrapper.social' && $rootScope.knownUsers.length > 2) {
        //     for (var i = 0; i < $rootScope.knownUsers.length; i++) {
        //       if ($rootScope.knownUsers[i].userID === data.data.userID) {
        //         $rootScope.knownUsers.splice(i,1);
        //       }
        //     }
        //     if (data.data.userID === $rootScope.currentUser.userID) {
        //       $rootScope.currentUser = $rootScope.knownUsers[0];
        //     }
        //     //UPDATE SOCIAL
        //   }
        // } else {
        //   for (var i = 0; i < $rootScope.unknownUsers.length; i++) {
        //     if ($rootScope.knownUsers[i].niteID === data.data.niteID) {
        //       $rootScope.knownUsers.splice(i,1);
        //     }
        //   }
        // }

      }, 'REMOVE_USER');















      // TextTransmission.fetchDataForWall(function(data) {
          
      //   console.log('ADD USER!', $rootScope.currentUser, data.data);

      //   // filter the current user and drop wthe ones with the same id
      //   var filteredUsers = $rootScope.users.filter(function(d) {
      //     if ($rootScope.currentUser.niteID === data.data.niteID) {
      //       if (data.data.niteID === $rootScope.currentUser.niteID && $rootScope.currentUser.userID === -2) {
                
      //         $rootScope.currentUser = data.data;
              
      //         // The user is known to the system
      //         if ($rootScope.currentUser.userID >= 0) {
      //           $state.transitionTo('wrapper.auth.welcome');
      //         // user is unknown
      //         } else if ($rootScope.currentUser.userID === -1) {
      //           $state.transitionTo('wrapper.auth.unknown');
      //         }

      //       } else {
      //         $rootScope.currentUser = data.data;
      //       }
      //     }
      //     if (d.niteID === data.data.niteID) {
      //       d.userID = data.data.userID;
      //       d.image = data.data.image;
      //     }
      //     return d.niteID !== data.data.niteID;
      //   });
        

      //   // okay, first check if a currentUser is set

      //   // if not, set it and go to loading screen
      //   if (!$rootScope.currentUser) {
      //     console.log('NO CURRENT_USER, GO TO LOADING SCREEN', $rootScope.currentUser);
      //     $rootScope.currentUser = data.data;
      //     $rootScope.users.push(data.data);
      //     // let's give them 60s
      //     $timeout(function() {
      //       if($rootScope.currentUser && $rootScope.currentUser.userID === -2) {
      //         $state.transitionTo('wrapper.nouser');
      //       }
      //     }, 60000);
          
      //     $state.transitionTo('wrapper.auth.loading');
        
      //   // if a currentUser is set, check his niteID is equal to the incoming message and go to welcome/unkown
      //   // if he does not have a userID (-2)
      //   }


      //   // check if the current message is currently in the alerts messages
      //   var alertsFilter = $scope.alerts.filter(function(d) {
      //     return d.niteID === data.data.niteID;
      //   });

      //   if ($rootScope.currentUser && filteredUsers.length === $rootScope.users.length) {
      //     $rootScope.users.push(data.data);
          
      //     $scope.alerts.push({
      //       data: data.data,
      //       msg: 'Neuer User wurde erkannt! Bewegen sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
      //     });

      //     $timeout(function() {
      //       $scope.alerts.shift();
      //       console.log('DELETED ALERT');
      //     }, 5000);


      //   } // else if ($rootScope.currentUser) {
          
      //   //   $rootScope.users = filteredUsers;
      //   //   $rootScope.users.push(data.data);
          
      //   //   if (alertsFilter.length === 0) {
      //   //     $scope.alerts.push({
      //   //       data: data.data,
      //   //       msg: 'Neuer User wurde erkannt! Bewegen sie beide Hände nach oben um zur Auswahl zu gelangen. Diese Nachricht verschwindet gleich!'
      //   //     });
      //   //   }

      //     // $timeout(function() {
      //     //   $scope.alerts.shift();
      //     //   console.log('DELETED ALERT');
      //     // }, 5000);
      //   // }


      // }, 'ADD_USER');


      // TextTransmission.fetchDataForWall(function(data) {
      //   console.log('REMOVED USER', $rootScope.users, $rootScope.currentUser);

      //   if ($rootScope.currentUser && data.data.niteID === $rootScope.currentUser.niteID) {
      //     $rootScope.currentUser = false;
      //   }
        
      //   $rootScope.users = $rootScope.users.filter(function(d) {
      //     return d.niteID !== data.data.niteID;
      //   });


      //   if (!$rootScope.currentUser && $rootScope.users.length === 0) {
      //     console.log('nouser');
      //     $state.transitionTo('wrapper.nouser');
      //   }


      //   if (!$rootScope.currentUser && $rootScope.users.length > 0) {
      //     $rootScope.currentUser = $rootScope.users.shift();
      //     console.log('user');
      //     $state.transitionTo('wrapper.main');
      //   }

      // }, 'REMOVE_USER');

      // $rootScope.fbToken = $q.defer();

      // TextTransmission.fetchTextForWall(function(data) {
      //     try {
      //       console.log('DATEN EMPFANGEN');
      //       $rootScope.fbToken.resolve(data.data);
      //       WidgetData.updateApiCall(data.data);
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   },'FBAUTH');


      // var Menu = new RadialService.Menu({selector: '#right'});
    }

  });

