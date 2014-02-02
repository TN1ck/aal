'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('Navigation', function($rootScope, RadialService, WidgetData){

    var widgetList = $('widget'),
        currentSelected = -1;

    var Menu;

    var toggleScreens = function () {

      var widgetBig = $rootScope.widgets[2];
      $rootScope.widgets[2] = $rootScope.widgets[currentSelected];
      $rootScope.widgets[currentSelected] = widgetBig;

    };

    $rootScope.$watch('$locationChangeStart', function() {
      
      widgetList = $('widget');
      currentSelected = 0;

      $('body').on('keydown', function(event) {
              
        if (event.which === 37) {
          Menu.moveMenuLeft();
          currentSelected = currentSelected === 0 ? (widgetList.length - 1) : (currentSelected - 1);
          $('.border').removeClass('border');
          $(widgetList[currentSelected])
            .removeClass('noborder')
              .addClass('border')
              .addClass('animate-border');
          $rootScope.$apply();
        }
        if (event.which === 39) {
          Menu.moveMenuRight();
          currentSelected = (currentSelected + 1) % widgetList.length;
          $('.border').removeClass('border');
          $(widgetList[currentSelected])
            .removeClass('noborder')
              .addClass('border')
              .addClass('animate-border');
          $rootScope.$apply();
        }
        if (event.which === 13) {
          toggleScreens();
          $rootScope.$apply();
        }
        if (event.which === 50) {
          currentSelected = -1;
          Menu = new RadialService.Menu({
            selector: '#right',
            data: WidgetData.widgets
          });
          Menu.enterMenu();
        }
        if (event.which === 27) {
          Menu.exitMenu();
          widgetList = $('widget');
          $rootScope.$apply();
        }
        if (event.which === 40) {
          Menu.enterMenu();
          widgetList = $(widgetList[currentSelected]).find('.widget');
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
