'use strict';

/* global angular */

var appControllers = angular.module('appControllers');


appControllers.controller('AuthCtrl',
  
  function ($scope, user, $FB, $location, $timeout, $rootScope) {
    
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    var getVideoData = function getVideoData(x, y, w, h) {
      var hiddenCanvas = document.createElement('canvas');
      hiddenCanvas.width = _video.width;
      hiddenCanvas.height = _video.height;
      var ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage(_video, 0, 0, _video.width, _video.height);
      return ctx.getImageData(x, y, w, h);
    };

    var makeSnapshot = function makeSnapshot(canvasID) {
      if (_video) {
        var patCanvas = document.querySelector('#' + canvasID);
        if (!patCanvas) {
          return;
        }

        patCanvas.width = _video.width;
        patCanvas.height = _video.height;
        var ctxPat = patCanvas.getContext('2d');

        var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
        ctxPat.putImageData(idata, 0, 0);
      }
    };

    $scope.step = 1;
    var _video;
    var step1 = function() {
      $scope.countDown(5, 100, 'step1countdown', function() {
        $scope.step++;
        makeSnapshot('step1');
        $scope.countDown(5, 100, 'step2countdown', function() {
          $scope.step++;
          makeSnapshot('step2');
          $scope.countDown(5, 100, 'step3countdown', function() {
            $scope.step++;
            makeSnapshot('step3');
          });
        });
      });
    };

    $scope.onSuccess = function (videoElem) {
      // The video element contains the captured camera data
      _video = videoElem;
      $scope.$apply(function() {
        $scope.patOpts.w = _video.width;
        $scope.patOpts.h = _video.height;
      });
      if (videoElem) {
        step1();
      }
    };

    $scope.login = function () {
      $FB.login(null, {
        scope: 'email, user_likes, read_stream, publish_actions, publish_stream'
      }).then(function() {
        $location.path('/auth/train');
      });
    };


    $scope.countDown = function(seconds, interval, model, cb) {
      var step = seconds/((seconds * 1000) / interval);
      $scope[model] = 0;
      var func = function() {
        if ($scope[model] >= seconds) {
          cb();
        } else {
          $scope[model] += step;
          $timeout(func, interval);
        }
      };

      func();

    };

    $scope.user = user.get;


      $.getJSON( 'http://smart-ip.net/geoip-json?callback=?',
        function(data){
          $scope.displayUrl = 'http://' + data.host + '/index.html#/mobile';
          $scope.url = 'http://' + data.host + '/index.html#/mobile' + '?mobileCode=' + $rootScope.mobileId;
        }
      );

    // $scope.url = 'http://' + document.location.host + '/index.html#/mobile';
    $scope.version = 4;
    $scope.level = 'L';
    $scope.size = $(window).height()/4;


  });

