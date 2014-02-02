'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('Navigation', function($rootScope, RadialService){

    var widgetList = $('widget'),
        currentSelected,
        toggleScreens;

    var Menu = new RadialService.Menu({
      selector: '#right',
      data: [
        {text: 'news', color: '#D65B3C'},
        {text: 'personal', color: '#D77F47'},
        {text: 'calendar', color: '#D9AA5A'},
        {text: 'social', color: '#70BE8A'},
        {text: 'todo', color: '#19806E'}
      ]
    });

    $rootScope.$watch('$locationChangeStart', function() {
      
      widgetList = $('widget');
      currentSelected = -1;
      toggleScreens = 0;

      $('body').on('keydown', function(event) {
              
        if (event.which === 37) {
          Menu.moveMenuLeft();
          if (currentSelected <= 0) {
            currentSelected = widgetList.length - 1;
          } else {
            currentSelected = (currentSelected - 1) % widgetList.length;
          }
          $rootScope.$apply();
        }
        if (event.which === 39) {
          Menu.moveMenuRight();
          currentSelected = (currentSelected + 1) % widgetList.length;
          $rootScope.$apply();
        }
        if (event.which === 13) {
          Menu.enterMenu();
          toggleScreens = !toggleScreens;
          $rootScope.$apply();
        }
        if (event.which === 27) {
          Menu.exitMenu();
          currentSelected = -1;
          $rootScope.$apply();
        }

      });
    });

    return {

      getCounter: function(questioner) {
        for(var i = widgetList.length; i--;){
          if (widgetList[i] === questioner.context) {
            return i;
          }
        }
      },

      selectNext: function() {
        return currentSelected++;
      },

      getCurrentSelected: function() {
        return currentSelected;
      },

      getToggleScreens: function() {
        return toggleScreens;
      }
    };
  });
