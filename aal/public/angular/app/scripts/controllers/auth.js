'use strict';

/* global angular, d3, $ */

var appControllers = angular.module('appControllers');


appControllers.controller('AuthCtrl',
  
  function ($scope, user, $FB, $location, $timeout, $rootScope, $state, $http, cssService, WidgetData, RadialService) {
    
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    cssService.createCss(WidgetData.colors);

    // var KEYMAPPING = {
    //   ENTER: 57,
    //   UP: 56,
    //   DOWN: 55
    // };

    $scope.startTraining = function () {
      $http.get('/starttraining/' + $rootScope.currentUser.niteID, function () {

      });
      $state.transitionTo('wrapper.auth.train');
    };

    var currentSelection = 0;

    // $(document).on('keypress', function(e) {

    //   var $buttons = $('.buttons').find('.btn');

    //   switch(e.keyCode) {
    if ($state.includes('wrapper.auth')) {

      d3.select('body')
        .on('keydown', function() {



          var $buttons = $('.buttons').find('.btn');

          switch (d3.event.keyCode) {
            
          case RadialService.KEYMAPPING.DOWN:
            $buttons = $('.buttons').find('.btn');
            currentSelection = (currentSelection === ($buttons.length - 1)) ? 0 : currentSelection + 1;
            $buttons.removeClass('btn-primary');
            $($buttons[currentSelection]).addClass('btn-primary');
            break;

          case RadialService.KEYMAPPING.UP:
            $buttons = $('.buttons').find('.btn');
            currentSelection = (currentSelection === 0) ? ($buttons.length - 1) : currentSelection - 1;
            $buttons.removeClass('btn-primary');
            $($buttons[currentSelection]).addClass('btn-primary');
            break;
          
          case RadialService.KEYMAPPING.SELECT:
            $buttons = $('.buttons').find('.btn');
            console.log('The following button will be clicked:' , $('.buttons').find('.btn-primary'));
            $('.buttons').find('.btn-primary')[0].click();

            // $buttons.removeClass('btn-primary');

            // var nextLocation = $('.buttons').find('.btn-primary').attr('ui-sref');
            // $state.transitionTo(nextLocation);
            break;

          }
        }
      );
    }

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
    $scope.step1 = function() {
      // if ($scope.step === 0) {
      //   return;
      // }
      $scope.countDown(2, 100, 'step1countdown', function() {
        $scope.step++;
        // makeSnapshot('step1');
        $scope.countDown(2, 100, 'step2countdown', function() {
          $scope.step++;
          // makeSnapshot('step2');
          $scope.countDown(2, 100, 'step3countdown', function() {
            $scope.step++;
            $state.transitionTo('wrapper.waiting');
            // makeSnapshot('step3');
          });
        });
      });
    };

    // $rootScope.$watch('currentUser', function() {
    //   if ($rootScope.currentUser && $rootScope.currentUser.userID > 0) {
    //     $state.transitionTo('wrapper.auth.welcome');
    //   } else if ($rootScope.currentUser && $rootScope.currentUser.userID === -1) {
    //     $state.transitionTo('wrapper.auth.unknown');
    //   }
    // });

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

    $scope.recognizeAgain = function(nid) {
      console.log('recognize: ', nid);
      $http.get('/recognize/' + nid);
    };


    // Get IP of Mobile site and generate Data for QR-Code

    // $.getJSON( 'http://smart-ip.net/geoip-json?callback=?',
    //   function(data){
    //     $scope.displayUrl = 'http://' + data.host + ':9000/index.html#/mobile';
    //     $scope.url = 'http://' + data.host + ':9000/index.html#/mobile' + '?mobileCode=' + $rootScope.mobileId;
    //   }
    // );

    $rootScope.url = 'http://living-wall.no-ip.org:9000/index.html#/mobile?mobileCode=' + $rootScope.mobileId;
    $rootScope.displayUrl = 'http://living-wall.no-ip.org:9000/index.html#/mobile';

    // $rootScope.url = 'https://' + document.location.host + '/index.html#/mobile' + '?mobileCode=' + $rootScope.mobileId;
    // $rootScope.displayUrl = 'https://' + document.location.host + '/index.html#/mobile';

    $rootScope.version = 4;
    $rootScope.level = 'L';
    $rootScope.size = $(window).height()/3;


  });

