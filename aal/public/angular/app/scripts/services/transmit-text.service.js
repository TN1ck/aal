'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('TextTransmission', function($rootScope, Websocket){
	return {
		// brings text from input device to Webserver
		deliverText: function(text) {
			Websocket.send(text);
		},
		// fetches text from server to the Wall
		fetchText: function(func) {
			Websocket.addListener(func);
		}
	};



});