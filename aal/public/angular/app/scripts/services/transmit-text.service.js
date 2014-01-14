'use strict';

/* global angular, $ */

var app = angular.module('angularApp');

app.factory('TextTransmission', function($rootScope, Websocket) {
	var mobileId = Math.floor(Math.random()*9000) + 1000;
	return {
		// mobile id
		mobileId: mobileId,
		code: '',
		// brings text from input device to Webserver
		deliverText: function(text) {
			if (code && code != '')
				Websocket.send(''+code, text);
		},
		// fetches text from server to the Wall
		fetchText: function(func) {
			Websocket.addListener(''+mobileId, func);
		}
	};
});