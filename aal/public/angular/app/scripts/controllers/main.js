// 'use strict';

/* global angular, moment */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', function ($scope, Persistence, $FB, $q) {

    updateMe();

    updateLoginStatus()
    .then(updateApiCall);

    $FB.Event.subscribe('auth.statusChange', function (statusRes) {
      $scope.loginStatus = statusRes;

      updateMe();
      updateApiCall();
    });

    $scope.login = function () {
      $FB.login(null, {scope: 'email,user_likes,read_stream'});
    };

    $scope.logout = function () {
      $FB.logout();
    };

    function updateMe () {
      $FB.getLoginStatus()
      .then(function () {
        return $FB.api('/me');
      })
      .then(function (me) {
        $scope.me = me;
      });
    }

    function updateLoginStatus () {
      return $FB.getLoginStatus()
        .then(function (res) {
          $scope.loginStatus = res;
        });
    }

    function updateApiCall () {
      return $q.all([
          $FB.api('/me'),
          $FB.api('/me/picture?type=large'),
          $FB.api('/me/home')
        ])
        .then(function (resList) {
          $scope.user = resList;
          $scope.user[0].picture = $scope.user[1].data;
          var postsArray = resList[2].data;
          console.log($scope.user);
          $scope.mockup.social = postsArray;
          for (var i=0; i<postsArray.length; i++) {
            (function(index) {
              $FB.api('/'+postsArray[index].from.id+'/picture').then(
                function(result) {
                  postsArray[index].from.profile_picture = result.data.url;
                }
              );
            }) (i);
          }
        });
    }


    $scope.mockup = {
        name: 'Cillian Murphy',
        picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
        telephone: '023234020',
        social: [
                {
                  type: 'twitter', text: 'some stupid entry.', created: '2013.05.03',
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                },
                {
                  type: 'facebook', text: 'some stupid entry. aoeu aoeu oeu', created: '2013.05.03',
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                },
                {
                  type: 'twitter', text: 'some stupid entry. aoeuaoeu aoeuaoeu toetu aosetu aoetus oestu asoeutoa es toeuts uetosn ', created: '2013.05.03',
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                },
                {
                  type: 'twitter', text: 'some stupid entry. aoeuaoeu aoeuaoeu toetu aosetu aoetus oestu asoeutoa es toeuts uetosn ', created: '2013.05.03',
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                },
                {
                  type: 'facebook', text: 'some stupid entry. aoeuaoeu aoeuaoeu toetu aosetu aoetus oestu asoeutoa es toeuts uetosn ', created: '2013.05.03',
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                }
              ],
      };

    Persistence
      .todo
      .get()
      .$promise
      .then(function(data) {
        $scope.mockup.todos = data;
      });

    Persistence
      .calendar
      .get()
      .$promise
      .then(function(data) {
        data = data.map(function(event) {
          event.weekday = moment(event.startDate).calendar().split(' ')[0];
          return event;
        });
        $scope.mockup.calendar = data;
      });

    Persistence
      .news
      .get()
      .$promise
      .then(function(data) {
        $scope.mockup.news = data;
      });

  });

