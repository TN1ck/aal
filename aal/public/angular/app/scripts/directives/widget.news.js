'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket) {



	// This code doesn't belong here, it's just to illustrate how Websockets work :) -- Max
	Websocket.onopen(function(evt) {
		console.log('opened');
		Websocket.send("Test");
	});
	Websocket.onmessage(function(evt) {console.log('got message');});
	Websocket.onclose(function(evt) {console.log('closed');});



    return {
        templateUrl: '/views/templates/widget.news.html',
        restrict: 'E',
        scope: {
            news: '=',
          }
        };
  });