'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('TextTransmition', function($rootScope, Websocket){
	return {
		// brings text from input device to Webserver
		fetchText: function (){
			var text = document.getElementsByName("transmitText")[0].value;
			Websocket.send(text); 
		},
		// delivers text from server to the Wall
		deliverText: function(){
			Websocket.addListener(function(text) {
				document.getElementsByName("globalTextDisplay")[0].value = text;
			});
		}
	}



});