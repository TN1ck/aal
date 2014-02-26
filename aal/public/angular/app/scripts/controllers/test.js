'use strict';

/* global angular, moment */

var appControllers = angular.module('appControllers');

appControllers.controller('TestCtrl', ['$scope', 'TextTransmission','$state','$rootScope','$location','$FB', '$http','$timeout',
  function ($scope, TextTransmission, $state, $rootScope, $location, $FB, $http, $timeout) {

    $scope.newKnownUser = function (uid) {
      TextTransmission.deliverDataForWall({niteID: 312, userID: -2},'ADD_USER');
      $timeout(function() {
        TextTransmission.deliverDataForWall({niteID: 312, userID: uid},'ADD_USER');
      }, 500);

    };
    $scope.newUnknownUser = function () {
      TextTransmission.deliverDataForWall({niteID: 312, userID: -2}, 'ADD_USER');
      $timeout(function() {
        TextTransmission.deliverDataForWall({niteID: 312, userID: -1},'ADD_USER');
      }, 500);
    };

    $scope.removeKnownUser = function (uid) {
      TextTransmission.deliverDataForWall({niteID: 312, userID: uid}, 'REMOVE_USER');
    };
    $scope.removeUnknownUser = function () {
      TextTransmission.deliverDataForWall({niteID: 312, userID: -1}, 'REMOVE_USER');
    };


    moment.lang('de');


    $scope.initCalendar = function () {
      TextTransmission.deliverDataForWall({entries: [{name: 'Birthday Party', description: 'Meet lots of people!', location: 'TU Berlin', startTime: moment(), endTime: moment()},{name: 'Homework', description: 'Do a lot of work!', location: 'TU Berlin', startTime: moment(), endTime: moment()}]},'CALENDAR');
    };

    $scope.initTodo = function () {
      TextTransmission.deliverDataForWall({items: [{text: 'Do groceries', prio: 'HIGH', created: moment()},{text: 'Clean room', prio: 'MIDDLE', created: moment()},{text: 'Homework', prio: 'LOW', created: moment()},{text: 'Buy Car', prio: 'LOW', created: moment()}]}, 'TODO');
    };

    $scope.initNews = function () {
      TextTransmission.deliverDataForWall({news: [{title: 'Klitschko fights', description: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN'}]}, 'NEWS');
    };

    $scope.initMail = function () {
      TextTransmission.deliverDataForWall({mails: [{from: 'Klitschko', content: 'CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN CHICKEN', received: moment(), subject: 'Yummy yummy'}]}, 'MAIL');
    };

    $scope.initEverything = function () {
      $scope.initMail();
      $scope.initNews();
      $scope.initTodo();
      $scope.initCalendar();
    }
  }
]);

