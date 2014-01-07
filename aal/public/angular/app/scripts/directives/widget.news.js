'use strict';

/* global angular */

var app = angular.module('angularApp');

app.directive('widgetNews', function(Websocket) {



	// This code doesn't belong here, it's just to illustrate how Websockets work :) -- Max
	// Websocket.onopen(function(evt) {
	// 	console.log('opened');
	// 	Websocket.send("Test");
	// });
  Websocket.onopen(function(evt) {
    // console.log('opened');
    Websocket.send("Test");
  });
  var firstListener = function(evt) {console.log('First Listener!')};
	Websocket.addListener(firstListener);
  Websocket.addListener(function(evt) {console.log('Second Listener!')});
	setTimeout(function() {Websocket.removeListener(firstListener)}, 2000);
  Websocket.onclose(function(evt) {console.log('closed');});
  // console.log(Websocket);


  return {
      templateUrl: '/views/templates/widget.news.html',
      restrict: 'E',
      scope: {
          news: '=',
        }
      };
});