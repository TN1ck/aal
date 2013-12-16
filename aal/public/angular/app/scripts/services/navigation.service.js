'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('Navigation', function($rootScope){
    var contentDiv = document.getElementById("content");

    var widgetList = document.getElementsByTagName('widget'),
        currentSelected = -1,
        fullscreenOn = 0;

    $('body').on('keydown', function(event) {
            
      if (event.which === 37) {
        if (currentSelected <= 0) {
          currentSelected = widgetList.length - 1;
        } else {
          currentSelected = (currentSelected - 1) % widgetList.length;
        }
        $rootScope.$apply();
      }
      if (event.which === 39) {
        currentSelected = (currentSelected + 1) % widgetList.length;
        $rootScope.$apply();
      }
      if (event.which === 13 && fullscreenOn === 0) {
        fullscreenOn = 1;
        $rootScope.$apply();
      }
      if (event.which === 27 && fullscreenOn === 1) {
        fullscreenOn = 0;
        $rootScope.$apply();

      }
    });

    return {

      getCounter: function (questioner){
        for(var i = widgetList.length; i--;){
          if (widgetList[i] === questioner.context) {
            return i;
          }
        }
      },

      selectNext: function (){
          return currentSelected++;
        },

      getCurrentSelected: function (){
          return currentSelected;
        },
      getFullscreenOn: function (){
          return fullscreenOn;
        }
    };
  });
