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
		// deliverText: function(text) {
		// 	if (this.code && this.code != '' && this.code.length==4)
		// 		console.log('deliverText received: ' + text);
		// 		Websocket.send(''+this.code, text);
		// },
		// // fetches text from server to the Wall
		// fetchText: function(func) {
		// 	Websocket.addListener(''+mobileId, func);
		// },
		// fetchMessage: function(func) {
		// 	Websocket.addListener(this.code,func);
		// }
		deliverTextForInputDevice: function(text) {
			Websocket.send('' + mobileId, text);
		},

		deliverTextForWall: function(data) {
			if (this.code && this.code.length === 4){
				Websocket.send('' + this.code + '1', data);
			}
		},

		fetchTextForWall: function(func) {
			console.log('fetchTextForWall listens on: ' + mobileId+1);
			Websocket.addListener('' + this.mobileId + '1', func);
		},

		fetchTextForInputDevice: function(func) {
			console.log('fetchTextForInputDevice listens on: ' + this.code);
			Websocket.addListener('' + this.code, func);
		}

	}
});