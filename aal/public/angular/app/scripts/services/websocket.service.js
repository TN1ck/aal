'use strict';

var app = angular.module('angularApp');

app.factory('Websocket', function($rootScope) {

  var timeOffset = 1000;
  timeOffset = timeOffset/2;

  var createSocket = function() {

    var wsURI = 'ws://' + window.location.host + '/websocket',
        socket = new WebSocket(wsURI);

    socket.openedRecently = true;
    setTimeout(function() {socket.openedRecently = false;}, timeOffset);

    socket.onopen = function() {

      var args = arguments;

      service.open = true;
      service.timesOpened++;

      // Attempted to connect. Note timestamp.
      service.connectTimeStamps.push(new Date().getTime());

      $rootScope.$broadcast('SOCKET_CLOSED');

      if (service.handlers.onopen) {
        $rootScope.$apply(function() {
          service.handlers.onopen.apply(socket, args);
        });
      }
    };

    socket.onmessage = function(data) {

      var split = data.data.split(':'),
          channel = split.shift(),
          message = {data: split.join(':')};

      try {
        var json = JSON.parse(message.data);
        // if no exception occured it was probably a json
        message.data = json;
      } catch (e) {

      }

      if (service.listeners.length > 0) {
        $rootScope.$apply(
          function() {
              service.listeners.forEach(function(listener) {
                  if (channel === listener[0]) {
                    listener[1](message);
                  }
                });
            });
      }
    };

    socket.onclose = function() {

      service.open = false;

      setTimeout(function() {
          socket = createSocket(service);
        }, 3000);

      $rootScope.$broadcast('SOCKET_OPEN');

      if (service.handlers.onclose) {
        $rootScope.$apply(
          function() {
              service.handlers.onclose.apply(socket, arguments);
            });
      }
    };

    return socket;

  };

  var service = {

    listeners: [],
    handlers: {},

    addListener: function(channel, func) {

      this.listeners.push([channel, func]);
      var thisOuter = this;
      setTimeout(function() {thisOuter.send(channel, '');}, timeOffset);
      // console.log('Added Listener at ' + channel);
    },

    removeListener: function(channelAndFunc) {

      var index = this.listeners.indexOf(channelAndFunc);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    },

    onopen: function(callback) {
      this.handlers.onopen = callback;
    },

    onclose: function(callback) {
      this.handlers.onclose = callback;
    },

    send: function(channel, data) {

      var errors = {
        0: 'Connection is being opened, can not send now.',
        2: 'Connection is being closed, can not send now',
        3: 'Weird error with WebSocket occured: socket.readyState == 3. Can not send messages.'
      };

      var error = errors[socket.readyState];

      if (error) {
        throw new Error(error);
        return;
      }

      var msg = typeof(data) === 'object' ? JSON.stringify(data) : data;
      var toSend = channel + ':' + msg;

      var timeToWait;
      if (socket.openedRecently) {
        timeToWait = timeOffset;
      } else {
        timeToWait = 0;
      }

      setTimeout(function() {
        socket.send(toSend);
        // console.log('Sent: ', toSend, channel, msg);
      }, timeToWait);
    },
    connectTimeStamps: [],
    timesOpened: 0,
    open: false
  };

  var socket = createSocket();
  return service;
});
