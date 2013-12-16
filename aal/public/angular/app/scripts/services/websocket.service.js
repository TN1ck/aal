// 'use strict';

var app = angular.module('angularApp');

app.factory('Websocket', function($rootScope) {
	var createSocket = function() {

		var loc = window.location;
		var wsURI = "ws://" + loc.host + "/websocket";
		var socket = new WebSocket(wsURI);

		socket.onopen = function() {
			var args = arguments;
			service.open = true;
			service.timesOpened++;
			// Attempted to connect. Note timestamp.
			service.connectTimeStamps.push(new Date().getTime());

			$rootScope.$broadcast('SOCKET_CLOSED');

			if (service.handlers.onopen) {
				$rootScope.$apply(function() {
					service.handlers.onopen.apply(socket, args)
				});
			}
		}

		socket.onmessage = function(data) {
			var args = arguments;
			try {
				args[0].data = JSON.parse(args[0].data);
			} catch(e) {
				// there should be a better way to do this
				// but it is fast
			}

			if (service.listeners.length > 0) {
				console.log("Yo, I'm here!")
				$rootScope.$apply(
					function() {
						for (var i=0; i<service.listeners.length; i++) {
							service.listeners[i].apply(socket, args);
						}
					}
				)
			}
		}

		socket.onclose = function(){
			service.open = false;
			setTimeout(function() {
				socket = createSocket(service);
			} , 3000);
			var args = arguments;
			$rootScope.$broadcast( 'SOCKET_OPEN' );

			if( service.handlers.onclose ){
				$rootScope.$apply(
					function() {
						service.handlers.onclose.apply(socket,args);
					}
				)
			}
		}

		return socket;
	}

	var service = {
		listeners: [],
		handlers: {},

		addListener: function(func) {
			if (!(func instanceof Function)) {
				new Error("Not a function.")
				return;
			}
			this.listeners.push(func);
		},
		removeListener: function(func) {
			if (!(func instanceof Function)) {
				new Error("Not a function.")
				return;
			}
			var index = this.listeners.indexOf(func);
			if (index > -1) {
    			this.listeners.splice(index, 1);
			}
		},
		onopen: function(callback) {
			this.handlers.onopen = callback;
		},
		// onmessage: function(callback) {
		// 	this.handlers.onmessage = callback;
		// },
		onclose: function(callback) {
			this.handlers.onclose = callback;
		},
		send: function(data) {
			err = null;
			switch (socket.readyState) {
				case 0:
					err = "Connection is being opened, can't send now.";
				case 2:
					err = "Connection is being closed, can't send now";
				case 3:
					err = "Weird error with WebSocket occured: socket.readyState == 3. Can't send messages.";
			}
			if (err) {
				new Error(err);
				return;
			}
			var msg = typeof(data) == "object" ? JSON.stringify(data) : data;
			socket.send(msg);
		},
		connectTimeStamps: [],
		timesOpened: 0,
		open: false
	};

	var socket = createSocket();
	return service;
});
