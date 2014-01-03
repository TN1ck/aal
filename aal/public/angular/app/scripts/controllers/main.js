'use strict';

/* global angular, moment */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', function ($scope, Persistence) {

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

    console.log(Persistence);

    Persistence
      .todo
      .get()
      .$promise
      .then(function(data) {
        console.log(data);
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

